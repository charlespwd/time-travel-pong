(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def ^:dynamic *max-bounce-angle* (* (.-PI js/Math) 0.41)) ;; ~~ 75degrees
(def ^:dynamic *panel-height* 100)

(def app-state (atom {}))
(def app-history (atom [@app-state]))
(def animation-frame (atom {}))
(def score (atom [0 0]))

(declare reset stop setup)

(defn reset []
  (do (reset! app-state {})
      (reset! app-history [@app-state])
      (stop)
      (setup)))

(defn log [s]
  (.log js/console s))

(defn draw-rect [context color x y width height]
  (do (set! (.-fillStyle context) color)
      (.fillRect context x y width height)))

(defn draw-text [context color font text x y]
  (do (set! (.-fillStyle context) color)
      (set! (.-font context) font)
      (.fillText context text x y)))

(defn get-context [id]
  (.getContext (dom/getElement id) "2d"))

(defn start-animation [f]
  (.requestAnimationFrame js/window f))

(defn stop-animation [rafid]
  (.cancelAnimationFrame js/window rafid))

(defn speed [v]
  (let [theta (rand (* 2 (.-PI js/Math)))]
    [(* v (.cos js/Math theta))
     (* v (.sin js/Math theta))]))

(defn vel [{:keys [vx vy]}]
  (.sqrt js/Math (+ (* vx vx) (* vy vy))))

(defprotocol Thing
  (draw [this context])
  (update [this dt])
  (center [this]))

(defrecord World [width height color]
  Thing
  (draw [this context]
    (do (draw-rect context color 0 0 width height)
        this))
  (update [this dt] this)
  (center [this]
    [(/ width 2)
     (/ height 2)]))

(defrecord Ball [width height x y vx vy]
  Thing
  (draw [this context]
    (do (draw-rect context "#fff" x y width height)
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
    (do (draw-rect context "#fff" x y width height)
        this))
  (update [this dt]
    (-> this
        (assoc :y (+ y (* direction 5)))))
  (center [this]
    [(+ x (/ width 2))
     (+ y (/ height 2))
     this]))

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
        [p1x] (center p1)
        [p2x] (center p2)]
    (cond
      (and (<= bx p1x) (<= bx ))
        (bounce-x (center ball) (center p1) 1)
      (and (>= bx p2x))
        (bounce-x (center ball) (center p2) -1)
      (<= by 0)  (bounce-y (center ball) 1)
      (>= by (- (:height *world*) 0))
        (bounce-y (center ball) -1)
      :default ball)))

(defrecord Game [things context]
  Thing
  (draw [this _]
    (assoc this :things (doall (map #(draw % context) things))))
  (update [this dt]
    (-> this
        (assoc-in [:things 1] (update-ball things))
        (update-in [:things]
                   #(into [] (doall (map (fn [t] (update t dt)) %)))))))

(defn update-rafid [rafid]
  (swap! animation-frame assoc :rafid rafid))

(defn update-app-state [game]
  (do (swap! app-history conj game)
      (reset! app-state game)
      game))

(defn score? [{[_ ball] :things}]
  (let [[bx] (center ball)]
    (not (< 0 bx (:width *world*)))))

(defrecord Score [x y color font]
  Thing
  (draw [this context]
    (let [text (str (first @score) " - " (second @score))]
     (draw-text context color font text x y)))
  (update [this _]
    this)
  (center [this]
    [x y]))

(defn update-score [{[_ ball] :things}]
  (let [[bx]        (center ball)
         p1-scored? (neg? (- (:width *world*) bx))
         index      (if p1-scored? 0 1)]
    (swap! score update-in [index] inc)))

(defn undo []
  (when (> (count @app-history) 1)
    (swap! app-history pop)
    (reset! app-state (last @app-history))
    @app-state))

(defn draw-and-update-with [game update-fn dt]
  (do (draw game nil)
      (update-fn game dt)))

(defn request-animation-frame [f & args]
  (update-rafid (start-animation (apply partial f args))))

(defn score! [game]
  (do (update-score game) (reset)))

(defn update! [game dt]
  (update-app-state (update game dt)))

(defn play [game t1 t2]
  (let [dt (- t2 (or t1 t2))]
    (-> game
        (draw-and-update-with update! dt)
        (#(if-not (score? %)
            (request-animation-frame play % t2)
            (do (score! %)))))))

(defn rewind [game t1 t2]
  (let [dt (- t2 (or t1 t2))]
    (-> game
        (draw-and-update-with undo dt)
        (#(if-not (empty? %)
            (request-animation-frame rewind % t2)
            (request-animation-frame play game t2))))))

(defn stop []
  (stop-animation (:rafid @animation-frame)))

(defn start []
  (do (stop)
      (draw @app-state nil)
      (start-animation (partial play @app-state nil))))

(defn rewind! []
  (do (stop)
      (draw @app-state nil)
      (start-animation (partial rewind @app-state nil))))

(defn setup []
  (let [context (get-context "game")
        world (map->World *world*)
        ball (apply ->Ball 20 20 290 190 (speed 400))
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)
        gamescore (->Score (- 300 60) 50 "#fff" "40px Courier")]
    (do (reset! app-state (->Game [world ball player1 player2 gamescore] context))
        (js/setTimeout #(start) 500))))

(set! (.-onload js/window) setup)

;; (js/setTimeout #(stop) 3000)
(js/setTimeout #(rewind!) 4000)
;; (js/setTimeout #(start) 5000)
;; (js/setTimeout #(reset) 4000)
;; (js/setTimeout #(log @app-history) 7000)
;; (js/setTimeout #(start) 10000)
