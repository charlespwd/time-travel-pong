(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [clojure.browser.repl :as repl]
            [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})

(defn log [s]
  (.log js/console s))

(defn drawRect [context color x y width height]
  (do (set! (.-fillStyle context) color)
      (.fillRect context x y width height)))

(defn getContext [id]
  (.getContext (dom/getElement id) "2d"))

(defn start-animation [f]
  (.requestAnimationFrame js/window f))

(defn stop-animation [rafid]
  (.cancelAnimationFrame js/window rafid))

(defn out-of-bounds? [x k]
  (or (> x (k *world*)) (< x 0)))

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
    ([(/ width 2) (/ height 2)])))

(defrecord Ball [width height x y vx vy]
  Thing
  (draw [this context]
    (do (drawRect context "#fff" x y width height)
        this))
  (update [this dt]
    (let [new-x (+ x (* vx (/ dt 1000.0)))
          new-y (+ y (* vy (/ dt 1000.0)))
          new-vx (if (out-of-bounds? new-x :width) (- vx) vx)
          new-vy (if (out-of-bounds? new-y :height) (- vy) vy)]
      (-> this
          (assoc :x new-x)
          (assoc :y new-y)
          (assoc :vx new-vx)
          (assoc :vy new-vy))))
  (center [this]
    [(+ x (/ width 2))
     (+ y (/ height 2))])
  )

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
     (+ y (/ height 2))]))

(defprotocol Lifecycled
  (start [this context])
  (stop [this]))

(defn animation [game context old-timestamp timestamp]
  (let [t1 (or old-timestamp timestamp)
        dt (- timestamp t1)
        updated-game (update game dt)]
    (do (draw updated-game context)
        (start-animation (partial animation updated-game context timestamp)))))

(defrecord Game [things]
  Thing
  (draw [this context]
    (assoc this :things (doall (map #(draw % context) things))))
  (update [this dt]
    (assoc this :things (doall (map #(update % dt) things))))
  Lifecycled
  (start [this context]
    (do (draw this context)
        (assoc this :rafid
               (start-animation (partial animation this context nil)))))
  (stop [this]
    (do (stop-animation (:rafid this))
        this)))

(defn setup []
  (let [context (getContext "game")
        world (map->World *world*)
        ball (->Ball 20 20 290 190 50 50)
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)
        game (->Game [world ball player1 player2])]
    (js/setTimeout #(start game context) 1000)))

(set! (.-onload js/window) setup)
