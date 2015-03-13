(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})

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

(defn in-bounds? [x k]
  (or (< x (k *world*)) (> x 0)))

(defprotocol Thing
  (draw [this context])
  (update [this dt]))

(defrecord World [width height color]
  Thing
  (draw [this context]
    (do (drawRect context color 0 0 width height)
        this))
  (update [this dt] this))

(defrecord Ball [width height x y vx vy]
  Thing
  (draw [this context]
    (do (drawRect context "#fff" x y width height)
        this))
  (update [this dt]
    (let [new-x (+ x (* vx (/ dt 1000.0)))
          new-y (+ y (* vy (/ dt 1000.0)))
          new-vx (if (in-bounds? new-x :width) vx (- vx))
          new-vy (if (in-bounds? new-y :height) vy (- vy))]
      (-> this
          (assoc :x new-x)
          (assoc :y new-y)
          (assoc :vx new-vx)
          (assoc :vy new-vy)))))

(defrecord Player [width height x y direction]
  Thing
  (draw [this context]
    (do (drawRect context "#fff" x y width height)
        this))
  (update [this dt]
    (-> this
        (assoc :y (+ y (* direction 5))))))

(defrecord Game [things context]
  Thing
  (draw [this _]
    (assoc this :things (doall (map #(draw % context) things))))
  (update [this dt]
    (assoc this :things (doall (map #(update % dt) things)))))

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

(defn rewind []
  (do (draw @app-state nil)
      (start-animation (partial animate-bwd @app-state nil))))

(defn stop []
  (stop-animation (:rafid @animation-frame)))

(defn reset []
  (do (stop)
      (setup)))

(defn setup []
  (let [context (get-context "game")
        world (map->World *world*)
        ball (->Ball 20 20 290 190 100 100)
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)]
    (do (reset! app-state (->Game [world ball player1 player2] context))
        (js/setTimeout #(start) 1000))))

(set! (.-onload js/window) setup)

;; (js/setTimeout #(stop) 3000)
;; (js/setTimeout #(rewind) 3000)
(js/setTimeout #(reset) 3000)

;; (js/setTimeout #(log @app-history) 7000)

;; (js/setTimeout #(start) 10000)
