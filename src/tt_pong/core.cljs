(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def ^:dynamic *max-bounce-angle* (* (.-PI js/Math) 0.41)) ;; ~~ 75degrees
(def ^:dynamic *panel-height* 100)

(declare restart stop setup)

(def app-state (atom {}))
(def app-history (atom [@app-state]))
(def animation-frame (atom {}))
(def score (atom [0 0]))

(defn restart []
  (do (reset! app-state {})
      (reset! app-history [@app-state])
      (stop)
      (setup)))

;;; Javascript abstractions

(def abs (.-abs js/Math))
(def cos (.-cos js/Math))
(def log (.-log js/console))
(def pi (.-PI js/Math))
(def sin (.-sin js/Math))
(def sqrt (.-sqrt js/Math))
(def start-animation (.-requestAnimationFrame js/window))
(def stop-animation (.-cancelAnimationFrame js/window))
(def timeout js/setTimeout)

(defn get-context [id]
  (.getContext (dom/getElement id) "2d"))

(defn draw-rect [context color x y width height]
  (do (set! (.-fillStyle context) color)
      (.fillRect context x y width height)))

(defn draw-text [context color font text x y]
  (do (set! (.-fillStyle context) color)
      (set! (.-font context) font)
      (.fillText context text x y)))

(defn update-rafid! [rafid]
  (swap! animation-frame assoc :rafid rafid))

(defn request-animation-frame! [f & args]
  (update-rafid! (start-animation (apply partial f args))))

;;; Ball logic

(defn random-velocity [speed]
  (let [theta (rand (* 2 pi))]
    [(* speed (cos theta))
     (* speed (sin theta))]))

(defn speed [{:keys [vx vy]}]
  (sqrt (+ (* vx vx) (* vy vy))))

(defn bounce-y [[bx by {:keys [vy y] :as ball}] dir]
  (-> ball
      (assoc :vy (* dir (abs vy)))
      (assoc :y (+ y dir))))

(defn bounce-x [[bx by {:keys [x] :as ball}] [px py player] dir]
  (let [relative-y (/ (- by py) (/ *panel-height* 2))
        theta (* relative-y *max-bounce-angle*)
        velocity (speed ball)
        ballvx (* velocity (cos theta))
        ballvy (* velocity (sin theta))]
    (if (< -1 relative-y 1) ; is it hitting the player?
      (-> ball
        (assoc :vx (* dir ballvx))
        (assoc :vy ballvy)
        (assoc :x (+ x dir)))
      ball)))

(defn update-ball [[world ball p1 p2 :as things]]
  (let [[bx by] (center ball)
        [p1x] (center p1)
        [p2x] (center p2)]
    (cond
      (<= bx p1x)
        (bounce-x (center ball) (center p1) 1)
      (>= bx p2x)
        (bounce-x (center ball) (center p2) -1)
      (<= by 0)
        (bounce-y (center ball) 1)
      (>= by (:height *world*))
        (bounce-y (center ball) -1)
      :default ball)))

;;; Records and Protocols

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

(defrecord Game [things context]
  Thing
  (draw [this _]
    (assoc this :things (doall (map #(draw % context) things))))
  (update [this dt]
    (-> this
        (assoc-in [:things 1] (update-ball things))
        (update-in [:things]
                   #(into [] (doall (map (fn [t] (update t dt)) %)))))))

(defrecord Score [x y color font]
  Thing
  (draw [this context]
    (let [text (str (first @score) " - " (second @score))]
     (draw-text context color font text x y)))
  (update [this _]
    this)
  (center [this]
    [x y]))

;;; Game flow helpers

(defn draw-and-update-with [game update-fn dt]
  (do (draw game nil)
      (update-fn game dt)))

(defn score? [{[_ ball] :things}]
  (let [[bx] (center ball)]
    (not (< 0 bx (:width *world*)))))

(defn score! [game]
  (do (update-score! game) (restart)))

(defn update-score! [{[_ ball] :things}]
  (let [[bx]        (center ball)
         p1-scored? (neg? (- (:width *world*) bx))
         index      (if p1-scored? 0 1)]
    (swap! score update-in [index] inc)))

(defn update-app-state! [game]
  (do (swap! app-history conj game)
      (reset! app-state game)
      game))

(defn update! [game dt]
  (update-app-state! (update game dt)))

(defn undo! [game dt]
  (when (> (count @app-history) 1)
    (swap! app-history pop)
    (reset! app-state (last @app-history))
    @app-state))

;;; Animations

(defn play! [game t1 t2]
  (let [dt (- t2 (or t1 t2))]
    (-> game
        (draw-and-update-with update! dt)
        (#(if-not (score? %)
            (request-animation-frame! play! % t2)
            (do (score! %)))))))

(defn rewind! [game t1 t2]
  (let [dt (- t2 (or t1 t2))]
    (-> game
        (draw-and-update-with undo! dt)
        (#(if-not (empty? %)
            (request-animation-frame! rewind! % t2)
            (request-animation-frame! play! game t2))))))

;;; Game Control

(defn start []
  (do (stop)
      (draw @app-state nil)
      (start-animation (partial play! @app-state nil))))

(defn rewind []
  (do (stop)
      (draw @app-state nil)
      (start-animation (partial rewind! @app-state nil))))

(defn stop []
  (stop-animation (:rafid @animation-frame)))

(defn setup []
  (let [context (get-context "game")
        world (map->World *world*)
        ball (apply ->Ball 20 20 290 190 (random-velocity 200))
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)
        gamescore (->Score (- 300 60) 50 "#fff" "40px Courier")]
    (do (reset! app-state (->Game [world ball player1 player2 gamescore] context))
        (timeout #(start) 500))))

(set! (.-onload js/window) setup)

#_(timeout #(stop) 3000)
#_(timeout #(rewind) 5000)
#_(timeout #(start) 6000)
#_(timeout #(restart) 4000)
#_(timeout #(start) 10000)
