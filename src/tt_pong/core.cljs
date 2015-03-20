(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]
            [goog.events :as events]))

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def max-bounce-angle (* (.-PI js/Math) 0.41)) ;; ~~ 75degrees
(def player-width 20)
(def player-height 100)
(def ball-size 20)

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
(def log #(.log js/console %))
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

;;; Keyboard Controls

(def controls {32 :space, 38 :up, 40 :down, 87 :w, 83 :d})
(def nudge 5) ;; by how many pixels does the player move when pressing a key?
(def key-state (atom {}))

(defn set-key-state-to! [bool]
  (fn [e]
    (when-let [keypressed (get controls (.-keyCode e) nil)]
      (.preventDefault e)
      (swap! key-state assoc keypressed bool))))

(events/listen
  (dom/getWindow) "keydown"
  (set-key-state-to! true))

(events/listen
  (dom/getWindow) "keyup"
  (set-key-state-to! false))

;;; Protocol and Record definitions

(defprotocol Thing
  (draw [this context])
  (update [this dt])
  (center [this]))

(defrecord World    [width height color])
(defrecord Ball     [width height x y vx vy])
(defrecord Player   [width height x y])
(defrecord AIPlayer [width height x y])

;;; Ball Logic

(defn random-velocity [speed]
  (let [theta (rand (* 2 pi))]
    [(* speed (cos theta))
     (* speed (sin theta))]))

(defn speed [{:keys [vx vy]}]
  (sqrt (+ (* vx vx) (* vy vy))))

(defn bounce
  ;; 2 arity for bouncing on the world boundary
  ([{:keys [vy y] :as ball} direction]
   (let [dir (direction {:up -1, :down 1})]
     (-> ball
         (assoc :vy (* dir (abs vy)))
         (assoc :y (+ y dir)))))

  ;; 3 arity for bouncing on a player
  ([{:keys [x] :as ball} direction player]
   (let [[bx by] (center ball)
         [px py] (center player)
         spd (speed ball)
         relative-y (/ (- by py) (/ player-height 2))
         theta  (* relative-y max-bounce-angle)
         ballvx (* spd (cos theta))
         ballvy (* spd (sin theta))
         dir (direction {:left -1, :right 1})]
     (if (< -1 relative-y 1) ; is it hitting the player?
       (-> ball
           (assoc :vx (* dir ballvx))
           (assoc :vy ballvy)
           (assoc :x (+ x dir)))
       ball))))

(defn update-ball [[world ball p1 p2 :as things]]
  (let [[bx by] (center ball)
        [p1x] (center p1)
        [p2x] (center p2)]
    (cond
      (<= bx p1x)
        (bounce ball :right p1)
      (>= bx p2x)
        (bounce ball :left p2)
      (<= by 0)
        (bounce ball :down)
      (>= by (:height *world*))
        (bounce ball :up)
      :default ball)))

;;; Player update

(defn move [{y :y :as player} direction]
  (let [f (direction {:up -, :down +})
        [_ yc] (center player)
        [new-y new-yc] (map #(f % nudge) [y yc])]
    (if (< 0 new-yc (:height *world*))
      (assoc player :y new-y)
      player)))

;;; Abstract implementations

(defn abstract-draw [{:keys [width height x y] :as thing} context]
  (do (draw-rect context "#fff" x y width height) thing))

(defn abstract-center [{:keys [x y width height] :as this}]
  [(+ x (/ width 2))
   (+ y (/ height 2))
   this])

;;; Protocol implementations

(extend-type World
  Thing
  (draw [{:keys [width height color] :as this} context]
    (do (draw-rect context color 0 0 width height)
        this))
  (update [this dt] this)
  (center [{:keys [width height] :as this}]
    [(/ width 2)
     (/ height 2)]))

(extend-type Ball
  Thing
  (draw [this context] (abstract-draw this context))
  (update [{:keys [x y vx vy] :as this} dt]
    (let [new-x (+ x (* vx (/ dt 1000.0)))
          new-y (+ y (* vy (/ dt 1000.0)))]
      (-> this
          (assoc :x new-x)
          (assoc :y new-y))))
  (center [this] (abstract-center this)))

(extend-type Player
  Thing
  (draw [this context] (abstract-draw this context))
  (update [this dt]
    (-> this
        (#(cond (:up @key-state)   (move % :up)
                (:down @key-state) (move % :down)
                :default %))))
  (center [this] (abstract-center this)))

(extend-type AIPlayer
  Thing
  (draw [this context] (abstract-draw this context))
  (update [this dt]
    (-> this
        (#(cond (:w @key-state) (move % :up)
                (:d @key-state) (move % :down)
                :default %))))
  (center [this] (abstract-center this)))

(defrecord Game [things context]
  Thing
  (draw [this _]
    (assoc this :things (into [] (doall (map #(draw % context) things)))))
  (update [this dt]
    (-> this
        (assoc-in [:things 1] (update-ball things))
        (update-in [:things]
                   #(into [] (doall (map (fn [t] (update t dt)) %)))))))

(defrecord Score [x y color font]
  Thing
  (draw [this context]
    (let [text (str (first @score) " - " (second @score))]
      (do (draw-text context color font text x y) this)))
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

(defn update-score! [{[_ ball] :things}]
  (let [[bx]        (center ball)
         p1-scored? (neg? (- (:width *world*) bx))
         index      (if p1-scored? 0 1)]
    (swap! score update-in [index] inc)))

(defn score! [game]
  (do (update-score! game) (restart)))

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

        [vx vy] (random-velocity 400)
        [xc yc] (center world)
        yoffset (- yc (/ player-height 2))

        ball (map->Ball {:width  ball-size
                         :height ball-size
                         :x 290, :y 190
                         :vx vx, :vy vy})

        player1 (map->AIPlayer {:width  player-width
                                :height player-height
                                :x 10, :y yoffset})

        player2 (map->Player {:width  player-width
                              :height player-height
                              :x 570, :y yoffset})

        gamescore (->Score (- 300 60) 50 "#fff" "40px Courier")]
    (do (reset! app-state (->Game [world ball player1 player2 gamescore] context))
        (timeout #(start) 500))))

(set! (.-onload js/window) setup)

;; #_(timeout #(stop) 3000)
;; #_(timeout #(rewind) 5000)
;; #_(timeout #(start) 6000)
;; #_(timeout #(restart) 4000)
;; #_(timeout #(start) 10000)
