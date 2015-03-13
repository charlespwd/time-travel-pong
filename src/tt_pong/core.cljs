(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def ^:dynamic *max-bounce-angle* (* (.-PI js/Math) 0.41)) ;; ~~ 75degrees
(def ^:dynamic *panel-height* 80)

(declare reset)

(defn log [s]
  (.log js/console s))

(defn drawRect [context color x y width height]
  (do (set! (.-fillStyle context) color)
      (.fillRect context x y width height)))

(defn get-context [id]
  (.getContext (dom/getElement id) "2d"))

(defn start-animation [f]
  (.requestAnimationFrame js/window f))

(defn stop-animation [rafid]
  (.cancelAnimationFrame js/window rafid))

(defprotocol Thing
  (draw [this context])
  (update [this dt])
  (center [this]))

(defrecord World [width height color]
  Thing
  (draw [this context]
    (do (drawRect context color 0 0 width height)
        this))
  (update [this dt] this)
  (center [this]
    [(/ width 2)
     (/ height 2)]))

(defrecord Ball [width height x y vx vy]
  Thing
  (draw [this context]
    (do (drawRect context "#fff" x y width height)
        this))
  (update [this dt]
    (let [new-x (+ x (* vx (/ dt 1000.0)))
          new-y (+ y (* vy (/ dt 1000.0))) ]
      (-> this
          (assoc :x new-x)
          (assoc :y new-y))))
  (center [this]
    [(+ x (/ width 2))
     (+ y (/ height 2))
     this]))

(defrecord Player [width height x y direction]
  Thing
  (draw [this context]
    (do (drawRect context "#fff" x y width height)
        this))
  (update [this dt]
    (-> this
        (assoc :y (+ y (* direction 5)))))
  (center [this]
    [(+ x (/ width 2))
     (+ y (/ height 2))
     this]))

(defn vel [{:keys [vx vy]}]
  (.sqrt js/Math (+ (* vx vx) (* vy vy))))

(defn bounce-y [[bx by ball] dir]
  (-> ball
      (assoc :vy (* dir (.abs js/Math (:vy ball))))
      (assoc :y (+ (:y ball) (* dir 1)))))

(defn bounce-x [[bx by ball] [px py player] dir]
  (let [relative-y (/ (- by py) (/ *panel-height* 2))
        theta (* relative-y *max-bounce-angle*)
        velocity (vel ball)
        ballvx (* velocity (.cos js/Math theta))
        ballvy (* velocity (.sin js/Math theta))]
    (if (< -1 relative-y 1)
      (-> ball
        (assoc :vx (* dir ballvx))
        (assoc :vy ballvy)
        (assoc :x (+ (:x ball) (* dir 1))))
      ball)))

;;; to be cheated...
(defn update-ball [[world ball p1 p2 :as things]]
  (let [[bx by] (center ball)
        p1x (:x p1)
        p2x (:x p2)]
    (cond
      (and (<= bx p1x) (<= bx ))
        (bounce-x (center ball) (center p1) 1)
      (and (>= bx p2x))
        (bounce-x (center ball) (center p2) -1)
      (<= by 0)  (bounce-y (center ball) 1)
      (>= by (- (:height *world*) 0))
        (bounce-y (center ball) -1)
      :default ball)))

(defn score? [{[_ ball] :things}]
  (let [[bx] (center ball)]
    (not (< 0 bx (:width *world*)))))

(defrecord Game [things context]
  Thing
  (draw [this _]
    (assoc this :things (doall (map #(draw % context) things))))
  (update [this dt]
    (if-not (score? this)
      (-> this
          (assoc-in [:things 1] (update-ball things))
          (update-in [:things]
                     #(into [] (doall (map (fn [t] (update t dt)) %)))))
      this
      )))

(def app-state (atom {}))
(def app-history (atom [@app-state]))
(def animation-frame (atom {}))

(defn update-rafid [rafid]
  (swap! animation-frame assoc :rafid rafid))

(defn update-app-state [game]
  (do (swap! app-history conj game)
      (reset! app-state game)))

(defn undo []
  (when (> (count @app-history) 1)
    (swap! app-history pop)
    (reset! app-state (last @app-history))
    @app-state))

(defn animate-fwd [game old-t timestamp]
  (let [t1 (or old-t timestamp)
        dt (- timestamp t1)
        updated-game (update game dt)]
    (do (draw updated-game nil)
        (update-app-state updated-game)
        (update-rafid (start-animation
           (partial animate-fwd updated-game timestamp))))))

(defn animate-bwd [game old-t timestamp]
  (let [t1 (or old-t timestamp)
        dt (- timestamp t1)
        updated-game (undo)]
    (when-not (empty? updated-game)
      (draw updated-game nil)
      (update-rafid (start-animation
                      (partial animate-bwd updated-game timestamp))))))

(defn start []
  (do (draw @app-state nil)
      (start-animation (partial animate-fwd @app-state nil))))

(defn stop []
  (stop-animation (:rafid @animation-frame)))

(defn setup []
  (let [context (get-context "game")
        world (map->World *world*)
        ball (->Ball 20 20 290 190 200 100)
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)]
    (do (reset! app-state (->Game [world ball player1 player2] context))
        (js/setTimeout #(start) 1000))))

(defn reset []
  (do (stop)
      (setup)))

(defn rewind []
  (do (stop)
      (draw @app-state nil)
      (start-animation (partial animate-bwd @app-state nil))))

(set! (.-onload js/window) setup)

;; (js/setTimeout #(stop) 3000)
;; (js/setTimeout #(rewind) 3000)
;; (js/setTimeout #(reset) 4000)

;; (js/setTimeout #(log @app-history) 7000)

;; (js/setTimeout #(start) 10000)
