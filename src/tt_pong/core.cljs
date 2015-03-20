(ns tt-pong.core
  (:refer-clojure :exclude [update])
  (:require [goog.dom :as dom]
            [goog.events :as events]))

(declare restart stop setup)

(def ^:dynamic *world* {:width 600, :height 400, :color "#333"})
(def ball-size 20) ; px
(def controls {32 :space, 38 :up, 40 :down, 87 :w, 83 :d}) ; map key code to keyword
(def difficulty 300) ; px/s
(def max-bounce-angle (* (.-PI js/Math) 0.41)) ; ~ 75º
(def move-dy-player 7) ; px
(def move-dy-ai (/ difficulty 100))
(def player-height 100)
(def player-width 20)

;; Global state

(def game-state (atom {}))
(def game-history (atom [@game-state]))
(def app-state (atom {:score [0 0] :rafid nil :keys-pressed {}}))
(defn key-is-pressed? [k]
  (get-in @app-state [:keys-pressed k]))

(defn restart []
  (do (reset! game-state {})
      (reset! game-history [@game-state])
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
  (swap! app-state assoc :rafid rafid))

(defn request-animation-frame! [f & args]
  (update-rafid! (start-animation (apply partial f args))))

;;; Keyboard Controls

(defn keycode->keypress [keycode]
  (get controls keycode nil))

(defn set-key-state-to! [bool]
  (fn [e]
    (when-let [key (keycode->keypress (.-keyCode e))]
      (.preventDefault e)
      (swap! app-state assoc-in [:keys-pressed key] bool))))

(events/listen
  (dom/getWindow) "keydown"
  (set-key-state-to! true))

(events/listen
  (dom/getWindow) "keyup"
  (set-key-state-to! false))

;;; Protocols and Records definitions

(defprotocol Thing
  (draw [this context ratio])
  (update [this dt])
  (center [this]))

(defrecord World    [width height color])
(defrecord Ball     [width height x y vx vy px py])
(defrecord Player   [width height x y px py])
(defrecord AIPlayer [width height x y px py])

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
         (assoc :py y)
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
           (assoc :px x)
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

(defn move [{y :y :as player} direction dy]
   (let [f (direction {:up -, :down +})
         [_ yc] (center player)
         [new-y new-yc] (map #(f % dy) [y yc])]
     (if (< 0 new-yc (:height *world*))
       (-> player
           (assoc :py y)
           (assoc :y new-y))
       player)))

;;; Abstract implementations

(defn abstract-draw [{:keys [width height x y px py] :as thing} context ratio]
  (if (and px ratio)
    ;; interpolate the location
    (let [ix (+ (* ratio x) (* (- 1 ratio) px))
          iy (+ (* ratio y) (* (- 1 ratio) py))]
      (do (draw-rect context "#fff" ix iy width height) thing))
    (do (draw-rect context "#fff" x y width height) thing)))

(defn abstract-center [{:keys [x y width height] :as this}]
  (map (fn [[a b]] (+ a (/ b 2))) [[x width] [y height]]))

;;; Protocol implementations

(extend-type World
  Thing
  (draw [{:keys [width height color] :as this} context _]
    (do (draw-rect context color 0 0 width height)
        this))
  (update [this dt] this)
  (center [{:keys [width height] :as this}]
    (map #(/ % 2) [width height])))

(extend-type Ball
  Thing
  (draw [this context ratio] (abstract-draw this context ratio))
  (update [{:keys [x y vx vy] :as this} dt]
    (let [new-x (+ x (* vx (/ dt 1000.0)))
          new-y (+ y (* vy (/ dt 1000.0)))]
      (-> this
          (assoc :px x)
          (assoc :py y)
          (assoc :x new-x)
          (assoc :y new-y))))
  (center [this] (abstract-center this)))

(extend-type Player
  Thing
  (draw [this context ratio] (abstract-draw this context ratio))
  (update [this dt]
    (-> this
        (#(cond (key-is-pressed? :up)   (move % :up move-dy-player)
                (key-is-pressed? :down) (move % :down move-dy-player)
                :default (assoc % :py (:y %))))))
  (center [this] (abstract-center this)))

(extend-type AIPlayer
  Thing
  (draw [this context ratio] (abstract-draw this context ratio))
  (update [this dt]
    (let [[_ ball] (:things @game-state)
          [_ by] (center ball)
          [_ py] (center this)
          bvx (:vx ball)]
      (-> this
        (#(cond (> py by) (move % :up   (if (> 0 bvx) move-dy-ai (/ move-dy-ai 3)))
                (< py by) (move % :down (if (> 0 bvx) move-dy-ai (/ move-dy-ai 3)))
                :default (assoc % :py (:y %)))))))
  (center [this] (abstract-center this)))

(defrecord Game [things context]
  Thing
  (draw [this _ ratio]
    (assoc this :things (into [] (doall (map #(draw % context ratio) things)))))
  (update [this dt]
    (-> this
        (assoc-in [:things 1] (update-ball things))
        (update-in [:things]
                   #(into [] (doall (map (fn [t] (update t dt)) %)))))))

(defrecord Score [x y color font]
  Thing
  (draw [this context _]
    (let [score (:score @app-state)
          text (str (first score) " - " (second score))]
      (do (draw-text context color font text x y) this)))
  (update [this _] this)
  (center [this] [x y]))

;;; Game flow helpers

;; This here is a bit heavy. Please take a look into time accumulators
;; to understand what's going on. In short, we want to draw on
;; requestAnimationFrame but we want the simulation to be constant
;; regardless of whether your computer is fast or not. You do this by
;; simulating as many time as you should have before drawing. But if
;; you stop there, you get a very jittery animation, so you must
;; interpolate the location of the object between two locations when
;; drawing. This is why we store both x and px, y and py.
;;
;; For more info, check
;; http://kirbysayshi.com/2013/09/24/interpolated-physics-rendering.html

(defn simulate-with [{:keys [remainder] :or {remainder 0} :as game} update-fn dt]
  (let [target-dt 16.66666666] ; 60 fps
    (loop [simulation (update-fn game dt)
           accumulator (+ dt remainder)] ; carry the remainder
      (if (< accumulator target-dt)
        [(assoc simulation :remainder accumulator) (/ accumulator target-dt)]
        (recur (update-fn simulation target-dt) (- accumulator target-dt))))))

(defn simulate-and-draw-with [game update-fn dt]
  (-> game
      (simulate-with update-fn dt)
      (#(draw (first %) nil (second %)))))

(defn score? [{[_ ball] :things}]
  (let [[bx] (center ball)]
    (not (< 0 bx (:width *world*)))))

(defn update-score! [{[_ ball] :things}]
  (let [[bx]        (center ball)
         p1-scored? (neg? (- (:width *world*) bx))
         index      (if p1-scored? 0 1)]
    (swap! app-state update-in [:score index] inc)))

(defn score! [game]
  (do (update-score! game)
      (restart)))

(defn update! [old-game dt]
  (let [game (update old-game dt)]
    (do (swap! game-history conj game)
        (reset! game-state game)
        game)))

(defn undo! [game dt]
  (if (> (count @game-history) 2)
    (do (swap! game-history pop)
        (reset! game-state (last @game-history))
        @game-state)
    @game-state))

;;; Animations

(defn is-asking-for-rewind? []
  (key-is-pressed? :space))

(defn play! [game t1 t2]
  (let [dt (- t2 (or t1 t2))]
    (if-not (is-asking-for-rewind?)
      (-> game
          (simulate-and-draw-with update! dt)
          (#(if-not (score? %)
              (request-animation-frame! play! % t2)
              (score! %))))
      (-> game
          (simulate-and-draw-with undo! dt)
          (#(request-animation-frame! play! % t2))))))

;;; Game Control

(defn start []
  (do (stop)
      (draw @game-state nil 0)
      (start-animation (partial play! @game-state nil))))

(defn stop []
  (stop-animation (:rafid @app-state)))

(defn setup []
  (let [context (get-context "game")

        world (map->World *world*)

        [vx vy] (random-velocity difficulty)
        [xc yc] (center world)
        yoffset (- yc (/ player-height 2))

        ball (map->Ball {:width  ball-size
                         :height ball-size
                         :x  290, :y  190
                         :px 290, :py 190
                         :vx vx, :vy vy})

        player1 (map->AIPlayer {:width  player-width
                                :height player-height
                                :x  10, :y  yoffset
                                :px 10, :py yoffset})

        player2 (map->Player {:width  player-width
                              :height player-height
                              :x  570, :y  yoffset
                              :px 570, :py yoffset})

        gamescore (->Score (- 300 60) 50 "#fff" "40px Courier")]
    (do (reset! game-state (->Game [world ball player1 player2 gamescore] context))
        (timeout #(start) 500))))

(events/listen (dom/getWindow) "load" setup)
