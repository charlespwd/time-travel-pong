(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [clojure.browser.repl :as repl]
            [goog.dom :as dom]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def game (atom {}))

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
          new-vx (if (out-of-bounds? new-x :width) (- vx) vx)
          new-vy (if (out-of-bounds? new-y :height) (- vy) vy)]
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

(defprotocol Lifecycled
  (start [this])
  (stop [this]))

(defprotocol Animated
  (animate [this t1 t2]))

(defrecord Game [things context]
  Thing
  (draw [this ctx]
    (assoc this :things (doall (map #(draw % ctx) things))))
  (update [this dt]
    (assoc this :things (doall (map #(update % dt) things))))
  Animated
  (animate [this old-t timestamp]
    (let [t1 (or old-t timestamp)
          dt (- timestamp t1)
          updated-game (update this dt)]
      (do (draw updated-game context)
          (assoc this :rafid
                 (start-animation
                   (partial animate updated-game timestamp))))))
  Lifecycled
  (start [this]
    (do (draw this context)
        (start-animation (partial animate this nil))))
  (stop [this] nil)) ;; TODO

(defn setup []
  (let [context (getContext "game")
        world (map->World *world*)
        ball (->Ball 20 20 290 190 80 80)
        player1 (->Player 20 80 10 150 0)
        player2 (->Player 20 80 570 150 0)]
    (do (reset! game (->Game [world ball player1 player2] context))
        (js/setTimeout #(start @game) 1000))))

(set! (.-onload js/window) setup)

