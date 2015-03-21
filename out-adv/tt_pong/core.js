// Compiled by ClojureScript 0.0-3058 {}
goog.provide('tt_pong.core');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.dom');


tt_pong.core.controls = new cljs.core.PersistentArrayMap(null, 3, [(32),cljs.core.constant$keyword$_COLON_space,(38),cljs.core.constant$keyword$_COLON_up,(40),cljs.core.constant$keyword$_COLON_down], null);
tt_pong.core.pi = Math.PI;
tt_pong.core.ball_size = (20);
tt_pong.core.difficulty = (400);
tt_pong.core.max_bounce_angle = (tt_pong.core.pi * 0.41);
tt_pong.core.move_dy_ai = (tt_pong.core.difficulty / (100));
tt_pong.core.move_dy_player = (7);
tt_pong.core.player_offset = (35);
tt_pong.core.player_height = (100);
tt_pong.core.player_width = (20);
tt_pong.core.world_color = "#333";
tt_pong.core.world_height = (400);
tt_pong.core.world_width = (600);
tt_pong.core.game_state = (function (){var G__352 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__352) : cljs.core.atom.call(null,G__352));
})();
tt_pong.core.game_history = (function (){var G__353 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__354 = tt_pong.core.game_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__354) : cljs.core.deref.call(null,G__354));
})()], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__353) : cljs.core.atom.call(null,G__353));
})();
tt_pong.core.app_state = (function (){var G__355 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$_COLON_score,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),cljs.core.constant$keyword$_COLON_rafid,null,cljs.core.constant$keyword$_COLON_keys_pressed,cljs.core.PersistentArrayMap.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__355) : cljs.core.atom.call(null,G__355));
})();
tt_pong.core.key_is_pressed_QMARK_ = (function tt_pong$core$key_is_pressed_QMARK_(k){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((function (){var G__357 = tt_pong.core.app_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__357) : cljs.core.deref.call(null,G__357));
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constant$keyword$_COLON_keys_pressed,k], null));
});
tt_pong.core.restart = (function tt_pong$core$restart(){
var G__363_368 = tt_pong.core.game_state;
var G__364_369 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__363_368,G__364_369) : cljs.core.reset_BANG_.call(null,G__363_368,G__364_369));

var G__365_370 = tt_pong.core.game_history;
var G__366_371 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__367 = tt_pong.core.game_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__367) : cljs.core.deref.call(null,G__367));
})()], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__365_370,G__366_371) : cljs.core.reset_BANG_.call(null,G__365_370,G__366_371));

(tt_pong.core.stop.cljs$core$IFn$_invoke$arity$0 ? tt_pong.core.stop.cljs$core$IFn$_invoke$arity$0() : tt_pong.core.stop.call(null));

return (tt_pong.core.setup.cljs$core$IFn$_invoke$arity$0 ? tt_pong.core.setup.cljs$core$IFn$_invoke$arity$0() : tt_pong.core.setup.call(null));
});
tt_pong.core.abs = Math.abs;
tt_pong.core.cos = Math.cos;
tt_pong.core.log = (function tt_pong$core$log(p1__372_SHARP_){
return console.log(p1__372_SHARP_);
});
tt_pong.core.sin = Math.sin;
tt_pong.core.sqrt = Math.sqrt;
tt_pong.core.start_animation = window.requestAnimationFrame;
tt_pong.core.stop_animation = window.cancelAnimationFrame;
tt_pong.core.timeout = setTimeout;
tt_pong.core.get_context = (function tt_pong$core$get_context(id){
return (function (){var G__374 = id;
return goog.dom.getElement(G__374);
})().getContext("2d");
});
tt_pong.core.draw_rect = (function tt_pong$core$draw_rect(context,color,x,y,width,height){
context.fillStyle = color;

return context.fillRect(x,y,width,height);
});
tt_pong.core.draw_text = (function tt_pong$core$draw_text(context,color,font,text,x,y){
context.fillStyle = color;

context.font = font;

return context.fillText(text,x,y);
});
/**
 * Request for an animation frame and save the ID.
 * @param {...*} var_args
 */
tt_pong.core.request_animation_frame_BANG_ = (function() { 
var tt_pong$core$request_animation_frame_BANG___delegate = function (f,args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(tt_pong.core.app_state,cljs.core.assoc,cljs.core.constant$keyword$_COLON_rafid,(function (){var G__376 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.partial,f,args);
return (tt_pong.core.start_animation.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.start_animation.cljs$core$IFn$_invoke$arity$1(G__376) : tt_pong.core.start_animation.call(null,G__376));
})());
};
var tt_pong$core$request_animation_frame_BANG_ = function (f,var_args){
var args = null;
if (arguments.length > 1) {
var G__377__i = 0, G__377__a = new Array(arguments.length -  1);
while (G__377__i < G__377__a.length) {G__377__a[G__377__i] = arguments[G__377__i + 1]; ++G__377__i;}
  args = new cljs.core.IndexedSeq(G__377__a,0);
} 
return tt_pong$core$request_animation_frame_BANG___delegate.call(this,f,args);};
tt_pong$core$request_animation_frame_BANG_.cljs$lang$maxFixedArity = 1;
tt_pong$core$request_animation_frame_BANG_.cljs$lang$applyTo = (function (arglist__378){
var f = cljs.core.first(arglist__378);
var args = cljs.core.rest(arglist__378);
return tt_pong$core$request_animation_frame_BANG___delegate(f,args);
});
tt_pong$core$request_animation_frame_BANG_.cljs$core$IFn$_invoke$arity$variadic = tt_pong$core$request_animation_frame_BANG___delegate;
return tt_pong$core$request_animation_frame_BANG_;
})()
;
tt_pong.core.set_key_state_to_BANG_ = (function tt_pong$core$set_key_state_to_BANG_(bool){
return (function (e){
var temp__4126__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(tt_pong.core.controls,e.keyCode,null);
if(cljs.core.truth_(temp__4126__auto__)){
var key = temp__4126__auto__;
e.preventDefault();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(tt_pong.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constant$keyword$_COLON_keys_pressed,key], null),bool);
} else {
return null;
}
});
});
var G__379_382 = (function (){return goog.dom.getWindow();
})();
var G__380_383 = "keydown";
var G__381_384 = tt_pong.core.set_key_state_to_BANG_(true);
goog.events.listen(G__379_382,G__380_383,G__381_384);
var G__385_388 = (function (){return goog.dom.getWindow();
})();
var G__386_389 = "keyup";
var G__387_390 = tt_pong.core.set_key_state_to_BANG_(false);
goog.events.listen(G__385_388,G__386_389,G__387_390);

tt_pong.core.Thing = (function (){var obj392 = {};
return obj392;
})();

tt_pong.core.draw = (function tt_pong$core$draw(this$,context,ratio){
if((function (){var and__10815__auto__ = this$;
if(and__10815__auto__){
return this$.tt_pong$core$Thing$draw$arity$3;
} else {
return and__10815__auto__;
}
})()){
return this$.tt_pong$core$Thing$draw$arity$3(this$,context,ratio);
} else {
var x__11091__auto__ = (((this$ == null))?null:this$);
return (function (){var or__10823__auto__ = (tt_pong.core.draw[(function (){var G__396 = x__11091__auto__;
return goog.typeOf(G__396);
})()]);
if(or__10823__auto__){
return or__10823__auto__;
} else {
var or__10823__auto____$1 = (tt_pong.core.draw["_"]);
if(or__10823__auto____$1){
return or__10823__auto____$1;
} else {
throw cljs.core.missing_protocol("Thing.draw",this$);
}
}
})().call(null,this$,context,ratio);
}
});

tt_pong.core.update = (function tt_pong$core$update(this$,dt){
if((function (){var and__10815__auto__ = this$;
if(and__10815__auto__){
return this$.tt_pong$core$Thing$update$arity$2;
} else {
return and__10815__auto__;
}
})()){
return this$.tt_pong$core$Thing$update$arity$2(this$,dt);
} else {
var x__11091__auto__ = (((this$ == null))?null:this$);
return (function (){var or__10823__auto__ = (tt_pong.core.update[(function (){var G__400 = x__11091__auto__;
return goog.typeOf(G__400);
})()]);
if(or__10823__auto__){
return or__10823__auto__;
} else {
var or__10823__auto____$1 = (tt_pong.core.update["_"]);
if(or__10823__auto____$1){
return or__10823__auto____$1;
} else {
throw cljs.core.missing_protocol("Thing.update",this$);
}
}
})().call(null,this$,dt);
}
});

tt_pong.core.center = (function tt_pong$core$center(this$){
if((function (){var and__10815__auto__ = this$;
if(and__10815__auto__){
return this$.tt_pong$core$Thing$center$arity$1;
} else {
return and__10815__auto__;
}
})()){
return this$.tt_pong$core$Thing$center$arity$1(this$);
} else {
var x__11091__auto__ = (((this$ == null))?null:this$);
return (function (){var or__10823__auto__ = (tt_pong.core.center[(function (){var G__404 = x__11091__auto__;
return goog.typeOf(G__404);
})()]);
if(or__10823__auto__){
return or__10823__auto__;
} else {
var or__10823__auto____$1 = (tt_pong.core.center["_"]);
if(or__10823__auto____$1){
return or__10823__auto____$1;
} else {
throw cljs.core.missing_protocol("Thing.center",this$);
}
}
})().call(null,this$);
}
});


/**
* @constructor
* @param {*} width
* @param {*} height
* @param {*} color
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.World = (function (width,height,color,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.color = color;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.World.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.World.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k406,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__408 = (((k406 instanceof cljs.core.Keyword))?k406.fqn:null);
switch (G__408) {
case "color":
return self__.color;

break;
case "height":
return self__.height;

break;
case "width":
return self__.width;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k406,else__11057__auto__);

}
});

tt_pong.core.World.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.World{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_color,self__.color],null))], null),self__.__extmap));
});

tt_pong.core.World.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.World.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.World(self__.width,self__.height,self__.color,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.World.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

tt_pong.core.World.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.World.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.World.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$_COLON_color,null,cljs.core.constant$keyword$_COLON_width,null,cljs.core.constant$keyword$_COLON_height,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.World(self__.width,self__.height,self__.color,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.World.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__405){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__409 = cljs.core.keyword_identical_QMARK_;
var expr__410 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__412 = cljs.core.constant$keyword$_COLON_width;
var G__413 = expr__410;
return (pred__409.cljs$core$IFn$_invoke$arity$2 ? pred__409.cljs$core$IFn$_invoke$arity$2(G__412,G__413) : pred__409.call(null,G__412,G__413));
})())){
return (new tt_pong.core.World(G__405,self__.height,self__.color,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__414 = cljs.core.constant$keyword$_COLON_height;
var G__415 = expr__410;
return (pred__409.cljs$core$IFn$_invoke$arity$2 ? pred__409.cljs$core$IFn$_invoke$arity$2(G__414,G__415) : pred__409.call(null,G__414,G__415));
})())){
return (new tt_pong.core.World(self__.width,G__405,self__.color,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__416 = cljs.core.constant$keyword$_COLON_color;
var G__417 = expr__410;
return (pred__409.cljs$core$IFn$_invoke$arity$2 ? pred__409.cljs$core$IFn$_invoke$arity$2(G__416,G__417) : pred__409.call(null,G__416,G__417));
})())){
return (new tt_pong.core.World(self__.width,self__.height,G__405,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.World(self__.width,self__.height,self__.color,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__405),null));
}
}
}
});

tt_pong.core.World.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_color,self__.color],null))], null),self__.__extmap));
});

tt_pong.core.World.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__405){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.World(self__.width,self__.height,self__.color,G__405,self__.__extmap,self__.__hash));
});

tt_pong.core.World.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.World.cljs$lang$type = true;

tt_pong.core.World.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/World");
});

tt_pong.core.World.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/World");
});

tt_pong.core.__GT_World = (function tt_pong$core$__GT_World(width,height,color){
return (new tt_pong.core.World(width,height,color,null,null,null));
});

tt_pong.core.map__GT_World = (function tt_pong$core$map__GT_World(G__407){
return (new tt_pong.core.World(cljs.core.constant$keyword$_COLON_width.cljs$core$IFn$_invoke$arity$1(G__407),cljs.core.constant$keyword$_COLON_height.cljs$core$IFn$_invoke$arity$1(G__407),cljs.core.constant$keyword$_COLON_color.cljs$core$IFn$_invoke$arity$1(G__407),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__407,cljs.core.constant$keyword$_COLON_width,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_height,cljs.core.constant$keyword$_COLON_color], 0)),null));
});


/**
* @constructor
* @param {*} width
* @param {*} height
* @param {*} x
* @param {*} y
* @param {*} vx
* @param {*} vy
* @param {*} px
* @param {*} py
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.Ball = (function (width,height,x,y,vx,vy,px,py,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.vx = vx;
this.vy = vy;
this.px = px;
this.py = py;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.Ball.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.Ball.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k420,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__422 = (((k420 instanceof cljs.core.Keyword))?k420.fqn:null);
switch (G__422) {
case "py":
return self__.py;

break;
case "px":
return self__.px;

break;
case "vy":
return self__.vy;

break;
case "vx":
return self__.vx;

break;
case "y":
return self__.y;

break;
case "x":
return self__.x;

break;
case "height":
return self__.height;

break;
case "width":
return self__.width;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k420,else__11057__auto__);

}
});

tt_pong.core.Ball.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.Ball{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_vx,self__.vx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_vy,self__.vy],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.Ball.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.Ball.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.Ball.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (8 + cljs.core.count(self__.__extmap));
});

tt_pong.core.Ball.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.Ball.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.Ball.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 8, [cljs.core.constant$keyword$_COLON_y,null,cljs.core.constant$keyword$_COLON_width,null,cljs.core.constant$keyword$_COLON_px,null,cljs.core.constant$keyword$_COLON_vx,null,cljs.core.constant$keyword$_COLON_vy,null,cljs.core.constant$keyword$_COLON_x,null,cljs.core.constant$keyword$_COLON_py,null,cljs.core.constant$keyword$_COLON_height,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.Ball.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__419){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__423 = cljs.core.keyword_identical_QMARK_;
var expr__424 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__426 = cljs.core.constant$keyword$_COLON_width;
var G__427 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__426,G__427) : pred__423.call(null,G__426,G__427));
})())){
return (new tt_pong.core.Ball(G__419,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__428 = cljs.core.constant$keyword$_COLON_height;
var G__429 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__428,G__429) : pred__423.call(null,G__428,G__429));
})())){
return (new tt_pong.core.Ball(self__.width,G__419,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__430 = cljs.core.constant$keyword$_COLON_x;
var G__431 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__430,G__431) : pred__423.call(null,G__430,G__431));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,G__419,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__432 = cljs.core.constant$keyword$_COLON_y;
var G__433 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__432,G__433) : pred__423.call(null,G__432,G__433));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,G__419,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__434 = cljs.core.constant$keyword$_COLON_vx;
var G__435 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__434,G__435) : pred__423.call(null,G__434,G__435));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,G__419,self__.vy,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__436 = cljs.core.constant$keyword$_COLON_vy;
var G__437 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__436,G__437) : pred__423.call(null,G__436,G__437));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,G__419,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__438 = cljs.core.constant$keyword$_COLON_px;
var G__439 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__438,G__439) : pred__423.call(null,G__438,G__439));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,G__419,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__440 = cljs.core.constant$keyword$_COLON_py;
var G__441 = expr__424;
return (pred__423.cljs$core$IFn$_invoke$arity$2 ? pred__423.cljs$core$IFn$_invoke$arity$2(G__440,G__441) : pred__423.call(null,G__440,G__441));
})())){
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,G__419,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__419),null));
}
}
}
}
}
}
}
}
});

tt_pong.core.Ball.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_vx,self__.vx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_vy,self__.vy],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.Ball.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__419){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.Ball(self__.width,self__.height,self__.x,self__.y,self__.vx,self__.vy,self__.px,self__.py,G__419,self__.__extmap,self__.__hash));
});

tt_pong.core.Ball.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.Ball.cljs$lang$type = true;

tt_pong.core.Ball.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/Ball");
});

tt_pong.core.Ball.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/Ball");
});

tt_pong.core.__GT_Ball = (function tt_pong$core$__GT_Ball(width,height,x,y,vx,vy,px,py){
return (new tt_pong.core.Ball(width,height,x,y,vx,vy,px,py,null,null,null));
});

tt_pong.core.map__GT_Ball = (function tt_pong$core$map__GT_Ball(G__421){
return (new tt_pong.core.Ball(cljs.core.constant$keyword$_COLON_width.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_height.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_x.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_vx.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_vy.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_px.cljs$core$IFn$_invoke$arity$1(G__421),cljs.core.constant$keyword$_COLON_py.cljs$core$IFn$_invoke$arity$1(G__421),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__421,cljs.core.constant$keyword$_COLON_width,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_height,cljs.core.constant$keyword$_COLON_x,cljs.core.constant$keyword$_COLON_y,cljs.core.constant$keyword$_COLON_vx,cljs.core.constant$keyword$_COLON_vy,cljs.core.constant$keyword$_COLON_px,cljs.core.constant$keyword$_COLON_py], 0)),null));
});


/**
* @constructor
* @param {*} width
* @param {*} height
* @param {*} x
* @param {*} y
* @param {*} px
* @param {*} py
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.Player = (function (width,height,x,y,px,py,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.px = px;
this.py = py;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.Player.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.Player.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k444,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__446 = (((k444 instanceof cljs.core.Keyword))?k444.fqn:null);
switch (G__446) {
case "py":
return self__.py;

break;
case "px":
return self__.px;

break;
case "y":
return self__.y;

break;
case "x":
return self__.x;

break;
case "height":
return self__.height;

break;
case "width":
return self__.width;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k444,else__11057__auto__);

}
});

tt_pong.core.Player.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.Player{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.Player.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.Player.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.Player.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (6 + cljs.core.count(self__.__extmap));
});

tt_pong.core.Player.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.Player.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.Player.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.constant$keyword$_COLON_y,null,cljs.core.constant$keyword$_COLON_width,null,cljs.core.constant$keyword$_COLON_px,null,cljs.core.constant$keyword$_COLON_x,null,cljs.core.constant$keyword$_COLON_py,null,cljs.core.constant$keyword$_COLON_height,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.Player.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__443){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__447 = cljs.core.keyword_identical_QMARK_;
var expr__448 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__450 = cljs.core.constant$keyword$_COLON_width;
var G__451 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__450,G__451) : pred__447.call(null,G__450,G__451));
})())){
return (new tt_pong.core.Player(G__443,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__452 = cljs.core.constant$keyword$_COLON_height;
var G__453 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__452,G__453) : pred__447.call(null,G__452,G__453));
})())){
return (new tt_pong.core.Player(self__.width,G__443,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__454 = cljs.core.constant$keyword$_COLON_x;
var G__455 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__454,G__455) : pred__447.call(null,G__454,G__455));
})())){
return (new tt_pong.core.Player(self__.width,self__.height,G__443,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__456 = cljs.core.constant$keyword$_COLON_y;
var G__457 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__456,G__457) : pred__447.call(null,G__456,G__457));
})())){
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,G__443,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__458 = cljs.core.constant$keyword$_COLON_px;
var G__459 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__458,G__459) : pred__447.call(null,G__458,G__459));
})())){
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,G__443,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__460 = cljs.core.constant$keyword$_COLON_py;
var G__461 = expr__448;
return (pred__447.cljs$core$IFn$_invoke$arity$2 ? pred__447.cljs$core$IFn$_invoke$arity$2(G__460,G__461) : pred__447.call(null,G__460,G__461));
})())){
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,self__.px,G__443,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__443),null));
}
}
}
}
}
}
});

tt_pong.core.Player.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.Player.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__443){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.Player(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,G__443,self__.__extmap,self__.__hash));
});

tt_pong.core.Player.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.Player.cljs$lang$type = true;

tt_pong.core.Player.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/Player");
});

tt_pong.core.Player.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/Player");
});

tt_pong.core.__GT_Player = (function tt_pong$core$__GT_Player(width,height,x,y,px,py){
return (new tt_pong.core.Player(width,height,x,y,px,py,null,null,null));
});

tt_pong.core.map__GT_Player = (function tt_pong$core$map__GT_Player(G__445){
return (new tt_pong.core.Player(cljs.core.constant$keyword$_COLON_width.cljs$core$IFn$_invoke$arity$1(G__445),cljs.core.constant$keyword$_COLON_height.cljs$core$IFn$_invoke$arity$1(G__445),cljs.core.constant$keyword$_COLON_x.cljs$core$IFn$_invoke$arity$1(G__445),cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(G__445),cljs.core.constant$keyword$_COLON_px.cljs$core$IFn$_invoke$arity$1(G__445),cljs.core.constant$keyword$_COLON_py.cljs$core$IFn$_invoke$arity$1(G__445),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__445,cljs.core.constant$keyword$_COLON_width,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_height,cljs.core.constant$keyword$_COLON_x,cljs.core.constant$keyword$_COLON_y,cljs.core.constant$keyword$_COLON_px,cljs.core.constant$keyword$_COLON_py], 0)),null));
});


/**
* @constructor
* @param {*} width
* @param {*} height
* @param {*} x
* @param {*} y
* @param {*} px
* @param {*} py
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.AIPlayer = (function (width,height,x,y,px,py,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.px = px;
this.py = py;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.AIPlayer.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.AIPlayer.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k464,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__466 = (((k464 instanceof cljs.core.Keyword))?k464.fqn:null);
switch (G__466) {
case "py":
return self__.py;

break;
case "px":
return self__.px;

break;
case "y":
return self__.y;

break;
case "x":
return self__.x;

break;
case "height":
return self__.height;

break;
case "width":
return self__.width;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k464,else__11057__auto__);

}
});

tt_pong.core.AIPlayer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.AIPlayer{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.AIPlayer.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.AIPlayer.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.AIPlayer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (6 + cljs.core.count(self__.__extmap));
});

tt_pong.core.AIPlayer.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.AIPlayer.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.AIPlayer.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.constant$keyword$_COLON_y,null,cljs.core.constant$keyword$_COLON_width,null,cljs.core.constant$keyword$_COLON_px,null,cljs.core.constant$keyword$_COLON_x,null,cljs.core.constant$keyword$_COLON_py,null,cljs.core.constant$keyword$_COLON_height,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.AIPlayer.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__463){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__467 = cljs.core.keyword_identical_QMARK_;
var expr__468 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__470 = cljs.core.constant$keyword$_COLON_width;
var G__471 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__470,G__471) : pred__467.call(null,G__470,G__471));
})())){
return (new tt_pong.core.AIPlayer(G__463,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__472 = cljs.core.constant$keyword$_COLON_height;
var G__473 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__472,G__473) : pred__467.call(null,G__472,G__473));
})())){
return (new tt_pong.core.AIPlayer(self__.width,G__463,self__.x,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__474 = cljs.core.constant$keyword$_COLON_x;
var G__475 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__474,G__475) : pred__467.call(null,G__474,G__475));
})())){
return (new tt_pong.core.AIPlayer(self__.width,self__.height,G__463,self__.y,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__476 = cljs.core.constant$keyword$_COLON_y;
var G__477 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__476,G__477) : pred__467.call(null,G__476,G__477));
})())){
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,G__463,self__.px,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__478 = cljs.core.constant$keyword$_COLON_px;
var G__479 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__478,G__479) : pred__467.call(null,G__478,G__479));
})())){
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,G__463,self__.py,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__480 = cljs.core.constant$keyword$_COLON_py;
var G__481 = expr__468;
return (pred__467.cljs$core$IFn$_invoke$arity$2 ? pred__467.cljs$core$IFn$_invoke$arity$2(G__480,G__481) : pred__467.call(null,G__480,G__481));
})())){
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,self__.px,G__463,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__463),null));
}
}
}
}
}
}
});

tt_pong.core.AIPlayer.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_px,self__.px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_py,self__.py],null))], null),self__.__extmap));
});

tt_pong.core.AIPlayer.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__463){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.AIPlayer(self__.width,self__.height,self__.x,self__.y,self__.px,self__.py,G__463,self__.__extmap,self__.__hash));
});

tt_pong.core.AIPlayer.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.AIPlayer.cljs$lang$type = true;

tt_pong.core.AIPlayer.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/AIPlayer");
});

tt_pong.core.AIPlayer.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/AIPlayer");
});

tt_pong.core.__GT_AIPlayer = (function tt_pong$core$__GT_AIPlayer(width,height,x,y,px,py){
return (new tt_pong.core.AIPlayer(width,height,x,y,px,py,null,null,null));
});

tt_pong.core.map__GT_AIPlayer = (function tt_pong$core$map__GT_AIPlayer(G__465){
return (new tt_pong.core.AIPlayer(cljs.core.constant$keyword$_COLON_width.cljs$core$IFn$_invoke$arity$1(G__465),cljs.core.constant$keyword$_COLON_height.cljs$core$IFn$_invoke$arity$1(G__465),cljs.core.constant$keyword$_COLON_x.cljs$core$IFn$_invoke$arity$1(G__465),cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(G__465),cljs.core.constant$keyword$_COLON_px.cljs$core$IFn$_invoke$arity$1(G__465),cljs.core.constant$keyword$_COLON_py.cljs$core$IFn$_invoke$arity$1(G__465),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__465,cljs.core.constant$keyword$_COLON_width,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_height,cljs.core.constant$keyword$_COLON_x,cljs.core.constant$keyword$_COLON_y,cljs.core.constant$keyword$_COLON_px,cljs.core.constant$keyword$_COLON_py], 0)),null));
});

tt_pong.core.random_velocity = (function tt_pong$core$random_velocity(speed){
var theta = (cljs.core.rand.cljs$core$IFn$_invoke$arity$1((0.75 * tt_pong.core.pi)) - (0.375 * tt_pong.core.pi));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((speed * (function (){var G__485 = theta;
return (tt_pong.core.cos.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.cos.cljs$core$IFn$_invoke$arity$1(G__485) : tt_pong.core.cos.call(null,G__485));
})()) * cljs.core.rand_nth(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))),(speed * (function (){var G__486 = theta;
return (tt_pong.core.sin.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.sin.cljs$core$IFn$_invoke$arity$1(G__486) : tt_pong.core.sin.call(null,G__486));
})())], null);
});
tt_pong.core.speed = (function tt_pong$core$speed(p__487){
var map__490 = p__487;
var map__490__$1 = ((cljs.core.seq_QMARK_(map__490))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__490):map__490);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__490__$1,cljs.core.constant$keyword$_COLON_vy);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__490__$1,cljs.core.constant$keyword$_COLON_vx);
var G__491 = ((vx * vx) + (vy * vy));
return (tt_pong.core.sqrt.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.sqrt.cljs$core$IFn$_invoke$arity$1(G__491) : tt_pong.core.sqrt.call(null,G__491));
});
tt_pong.core.bounce = (function() {
var tt_pong$core$bounce = null;
var tt_pong$core$bounce__2 = (function (p__492,direction){
var map__503 = p__492;
var map__503__$1 = ((cljs.core.seq_QMARK_(map__503))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__503):map__503);
var ball = map__503__$1;
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__503__$1,cljs.core.constant$keyword$_COLON_y);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__503__$1,cljs.core.constant$keyword$_COLON_vy);
var dir = (function (){var G__504 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$_COLON_up,(-1),cljs.core.constant$keyword$_COLON_down,(1)], null);
return (direction.cljs$core$IFn$_invoke$arity$1 ? direction.cljs$core$IFn$_invoke$arity$1(G__504) : direction.call(null,G__504));
})();
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ball,cljs.core.constant$keyword$_COLON_vy,(dir * (function (){var G__505 = vy;
return (tt_pong.core.abs.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.abs.cljs$core$IFn$_invoke$arity$1(G__505) : tt_pong.core.abs.call(null,G__505));
})())),cljs.core.constant$keyword$_COLON_py,y),cljs.core.constant$keyword$_COLON_y,(y + dir));
});
var tt_pong$core$bounce__3 = (function (p__493,direction,player){
var map__506 = p__493;
var map__506__$1 = ((cljs.core.seq_QMARK_(map__506))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__506):map__506);
var ball = map__506__$1;
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__506__$1,cljs.core.constant$keyword$_COLON_x);
var vec__507 = tt_pong.core.center(ball);
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__507,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__507,(1),null);
var vec__508 = tt_pong.core.center(player);
var px = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__508,(0),null);
var py = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__508,(1),null);
var spd = tt_pong.core.speed(ball);
var relative_y = ((by - py) / (tt_pong.core.player_height / (2)));
var theta = (relative_y * tt_pong.core.max_bounce_angle);
var ballvx = (spd * (function (){var G__509 = theta;
return (tt_pong.core.cos.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.cos.cljs$core$IFn$_invoke$arity$1(G__509) : tt_pong.core.cos.call(null,G__509));
})());
var ballvy = (spd * (function (){var G__510 = theta;
return (tt_pong.core.sin.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.sin.cljs$core$IFn$_invoke$arity$1(G__510) : tt_pong.core.sin.call(null,G__510));
})());
var dir = (function (){var G__511 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$_COLON_left,(-1),cljs.core.constant$keyword$_COLON_right,(1)], null);
return (direction.cljs$core$IFn$_invoke$arity$1 ? direction.cljs$core$IFn$_invoke$arity$1(G__511) : direction.call(null,G__511));
})();
if((((-1) < relative_y)) && ((relative_y < (1)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ball,cljs.core.constant$keyword$_COLON_vx,(dir * ballvx)),cljs.core.constant$keyword$_COLON_vy,ballvy),cljs.core.constant$keyword$_COLON_px,x),cljs.core.constant$keyword$_COLON_x,(x + dir));
} else {
return ball;
}
});
tt_pong$core$bounce = function(p__493,direction,player){
switch(arguments.length){
case 2:
return tt_pong$core$bounce__2.call(this,p__493,direction);
case 3:
return tt_pong$core$bounce__3.call(this,p__493,direction,player);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tt_pong$core$bounce.cljs$core$IFn$_invoke$arity$2 = tt_pong$core$bounce__2;
tt_pong$core$bounce.cljs$core$IFn$_invoke$arity$3 = tt_pong$core$bounce__3;
return tt_pong$core$bounce;
})()
;
tt_pong.core.update_ball = (function tt_pong$core$update_ball(p__512){
var vec__517 = p__512;
var world = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__517,(0),null);
var ball = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__517,(1),null);
var p1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__517,(2),null);
var p2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__517,(3),null);
var things = vec__517;
var vec__518 = tt_pong.core.center(ball);
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__518,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__518,(1),null);
var vec__519 = tt_pong.core.center(p1);
var p1x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__519,(0),null);
var vec__520 = tt_pong.core.center(p2);
var p2x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__520,(0),null);
if((bx <= p1x)){
return tt_pong.core.bounce.cljs$core$IFn$_invoke$arity$3(ball,cljs.core.constant$keyword$_COLON_right,p1);
} else {
if((bx >= p2x)){
return tt_pong.core.bounce.cljs$core$IFn$_invoke$arity$3(ball,cljs.core.constant$keyword$_COLON_left,p2);
} else {
if((by <= (0))){
return tt_pong.core.bounce.cljs$core$IFn$_invoke$arity$2(ball,cljs.core.constant$keyword$_COLON_down);
} else {
if((by >= tt_pong.core.world_height)){
return tt_pong.core.bounce.cljs$core$IFn$_invoke$arity$2(ball,cljs.core.constant$keyword$_COLON_up);
} else {
return ball;

}
}
}
}
});
tt_pong.core.move = (function tt_pong$core$move(p__522,direction,dy){
var map__529 = p__522;
var map__529__$1 = ((cljs.core.seq_QMARK_(map__529))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__529):map__529);
var player = map__529__$1;
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__529__$1,cljs.core.constant$keyword$_COLON_y);
var f = (function (){var G__532 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$_COLON_up,cljs.core._,cljs.core.constant$keyword$_COLON_down,cljs.core._PLUS_], null);
return (direction.cljs$core$IFn$_invoke$arity$1 ? direction.cljs$core$IFn$_invoke$arity$1(G__532) : direction.call(null,G__532));
})();
var vec__530 = tt_pong.core.center(player);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__530,(0),null);
var yc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__530,(1),null);
var vec__531 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (f,vec__530,_,yc,map__529,map__529__$1,player,y){
return (function (p1__521_SHARP_){
var G__533 = p1__521_SHARP_;
var G__534 = dy;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__533,G__534) : f.call(null,G__533,G__534));
});})(f,vec__530,_,yc,map__529,map__529__$1,player,y))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,yc], null));
var new_y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__531,(0),null);
var new_yc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__531,(1),null);
if((((0) < new_yc)) && ((new_yc < tt_pong.core.world_height))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(player,cljs.core.constant$keyword$_COLON_py,y),cljs.core.constant$keyword$_COLON_y,new_y);
} else {
return player;
}
});
tt_pong.core.abstract_draw = (function tt_pong$core$abstract_draw(p__535,context,ratio){
var map__537 = p__535;
var map__537__$1 = ((cljs.core.seq_QMARK_(map__537))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__537):map__537);
var thing = map__537__$1;
var py = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_py);
var px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_px);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_x);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_height);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__537__$1,cljs.core.constant$keyword$_COLON_width);
if(cljs.core.truth_((function (){var and__10815__auto__ = px;
if(cljs.core.truth_(and__10815__auto__)){
return ratio;
} else {
return and__10815__auto__;
}
})())){
var ix = ((ratio * x) + (((1) - ratio) * px));
var iy = ((ratio * y) + (((1) - ratio) * py));
tt_pong.core.draw_rect(context,"#fff",ix,iy,width,height);

return thing;
} else {
tt_pong.core.draw_rect(context,"#fff",x,y,width,height);

return thing;
}
});
tt_pong.core.abstract_center = (function tt_pong$core$abstract_center(p__538){
var map__542 = p__538;
var map__542__$1 = ((cljs.core.seq_QMARK_(map__542))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__542):map__542);
var this$ = map__542__$1;
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__542__$1,cljs.core.constant$keyword$_COLON_height);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__542__$1,cljs.core.constant$keyword$_COLON_width);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__542__$1,cljs.core.constant$keyword$_COLON_y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__542__$1,cljs.core.constant$keyword$_COLON_x);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__542,map__542__$1,this$,height,width,y,x){
return (function (p__543){
var vec__544 = p__543;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__544,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__544,(1),null);
return (a + (b / (2)));
});})(map__542,map__542__$1,this$,height,width,y,x))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,width], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,height], null)], null));
});
tt_pong.core.World.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.World.prototype.tt_pong$core$Thing$draw$arity$3 = (function (p__546,context,_){
var map__547 = p__546;
var map__547__$1 = ((cljs.core.seq_QMARK_(map__547))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__547):map__547);
var this$ = map__547__$1;
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__547__$1,cljs.core.constant$keyword$_COLON_color);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__547__$1,cljs.core.constant$keyword$_COLON_height);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__547__$1,cljs.core.constant$keyword$_COLON_width);
var map__548 = this;
var map__548__$1 = ((cljs.core.seq_QMARK_(map__548))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__548):map__548);
var this$__$1 = map__548__$1;
var color__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__548__$1,cljs.core.constant$keyword$_COLON_color);
var height__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__548__$1,cljs.core.constant$keyword$_COLON_height);
var width__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__548__$1,cljs.core.constant$keyword$_COLON_width);
tt_pong.core.draw_rect(context,color__$1,(0),(0),width__$1,height__$1);

return this$__$1;
});

tt_pong.core.World.prototype.tt_pong$core$Thing$update$arity$2 = (function (this$,dt){
var this$__$1 = this;
return this$__$1;
});

tt_pong.core.World.prototype.tt_pong$core$Thing$center$arity$1 = (function (p__549){
var map__550 = p__549;
var map__550__$1 = ((cljs.core.seq_QMARK_(map__550))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__550):map__550);
var this$ = map__550__$1;
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__550__$1,cljs.core.constant$keyword$_COLON_height);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__550__$1,cljs.core.constant$keyword$_COLON_width);
var map__551 = this;
var map__551__$1 = ((cljs.core.seq_QMARK_(map__551))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__551):map__551);
var this$__$1 = map__551__$1;
var height__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__551__$1,cljs.core.constant$keyword$_COLON_height);
var width__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__551__$1,cljs.core.constant$keyword$_COLON_width);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__551,map__551__$1,this$__$1,height__$1,width__$1,map__550,map__550__$1,this$,height,width){
return (function (p1__545_SHARP_){
return (p1__545_SHARP_ / (2));
});})(map__551,map__551__$1,this$__$1,height__$1,width__$1,map__550,map__550__$1,this$,height,width))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [width__$1,height__$1], null));
});
tt_pong.core.Ball.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.Ball.prototype.tt_pong$core$Thing$draw$arity$3 = (function (this$,context,ratio){
var this$__$1 = this;
return tt_pong.core.abstract_draw(this$__$1,context,ratio);
});

tt_pong.core.Ball.prototype.tt_pong$core$Thing$update$arity$2 = (function (p__552,dt){
var map__553 = p__552;
var map__553__$1 = ((cljs.core.seq_QMARK_(map__553))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__553):map__553);
var this$ = map__553__$1;
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__553__$1,cljs.core.constant$keyword$_COLON_vy);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__553__$1,cljs.core.constant$keyword$_COLON_vx);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__553__$1,cljs.core.constant$keyword$_COLON_y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__553__$1,cljs.core.constant$keyword$_COLON_x);
var map__554 = this;
var map__554__$1 = ((cljs.core.seq_QMARK_(map__554))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__554):map__554);
var this$__$1 = map__554__$1;
var vy__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__554__$1,cljs.core.constant$keyword$_COLON_vy);
var vx__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__554__$1,cljs.core.constant$keyword$_COLON_vx);
var y__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__554__$1,cljs.core.constant$keyword$_COLON_y);
var x__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__554__$1,cljs.core.constant$keyword$_COLON_x);
var new_x = (x__$1 + (vx__$1 * (dt / 1000.0)));
var new_y = (y__$1 + (vy__$1 * (dt / 1000.0)));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.constant$keyword$_COLON_px,x__$1),cljs.core.constant$keyword$_COLON_py,y__$1),cljs.core.constant$keyword$_COLON_x,new_x),cljs.core.constant$keyword$_COLON_y,new_y);
});

tt_pong.core.Ball.prototype.tt_pong$core$Thing$center$arity$1 = (function (this$){
var this$__$1 = this;
return tt_pong.core.abstract_center(this$__$1);
});
tt_pong.core.Player.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.Player.prototype.tt_pong$core$Thing$draw$arity$3 = (function (this$,context,ratio){
var this$__$1 = this;
return tt_pong.core.abstract_draw(this$__$1,context,ratio);
});

tt_pong.core.Player.prototype.tt_pong$core$Thing$update$arity$2 = (function (this$,dt){
var this$__$1 = this;
if(cljs.core.truth_(tt_pong.core.key_is_pressed_QMARK_(cljs.core.constant$keyword$_COLON_up))){
return tt_pong.core.move(this$__$1,cljs.core.constant$keyword$_COLON_up,tt_pong.core.move_dy_player);
} else {
if(cljs.core.truth_(tt_pong.core.key_is_pressed_QMARK_(cljs.core.constant$keyword$_COLON_down))){
return tt_pong.core.move(this$__$1,cljs.core.constant$keyword$_COLON_down,tt_pong.core.move_dy_player);
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.constant$keyword$_COLON_py,cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(this$__$1));

}
}
});

tt_pong.core.Player.prototype.tt_pong$core$Thing$center$arity$1 = (function (this$){
var this$__$1 = this;
return tt_pong.core.abstract_center(this$__$1);
});
tt_pong.core.AIPlayer.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.AIPlayer.prototype.tt_pong$core$Thing$draw$arity$3 = (function (this$,context,ratio){
var this$__$1 = this;
return tt_pong.core.abstract_draw(this$__$1,context,ratio);
});

tt_pong.core.AIPlayer.prototype.tt_pong$core$Thing$update$arity$2 = (function (this$,dt){
var this$__$1 = this;
var vec__555 = cljs.core.constant$keyword$_COLON_things.cljs$core$IFn$_invoke$arity$1((function (){var G__558 = tt_pong.core.game_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__558) : cljs.core.deref.call(null,G__558));
})());
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__555,(0),null);
var ball = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__555,(1),null);
var vec__556 = tt_pong.core.center(ball);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__556,(0),null);
var by = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__556,(1),null);
var vec__557 = tt_pong.core.center(this$__$1);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__557,(0),null);
var py = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__557,(1),null);
var bvx = cljs.core.constant$keyword$_COLON_vx.cljs$core$IFn$_invoke$arity$1(ball);
if((py > by)){
return tt_pong.core.move(this$__$1,cljs.core.constant$keyword$_COLON_up,((((0) > bvx))?tt_pong.core.move_dy_ai:(tt_pong.core.move_dy_ai / (3))));
} else {
if((py < by)){
return tt_pong.core.move(this$__$1,cljs.core.constant$keyword$_COLON_down,((((0) > bvx))?tt_pong.core.move_dy_ai:(tt_pong.core.move_dy_ai / (3))));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.constant$keyword$_COLON_py,cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(this$__$1));

}
}
});

tt_pong.core.AIPlayer.prototype.tt_pong$core$Thing$center$arity$1 = (function (this$){
var this$__$1 = this;
return tt_pong.core.abstract_center(this$__$1);
});

/**
* @constructor
* @param {*} things
* @param {*} context
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.Game = (function (things,context,__meta,__extmap,__hash){
this.things = things;
this.context = context;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.Game.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.Game.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k562,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__564 = (((k562 instanceof cljs.core.Keyword))?k562.fqn:null);
switch (G__564) {
case "context":
return self__.context;

break;
case "things":
return self__.things;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k562,else__11057__auto__);

}
});

tt_pong.core.Game.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.Game{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_things,self__.things],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_context,self__.context],null))], null),self__.__extmap));
});

tt_pong.core.Game.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.Game.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.Game(self__.things,self__.context,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.Game.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

tt_pong.core.Game.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.Game.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.Game.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.Game.prototype.tt_pong$core$Thing$draw$arity$3 = (function (this$,_,ratio){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.constant$keyword$_COLON_things,cljs.core.vec(cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p1__559_SHARP_){
return tt_pong.core.draw(p1__559_SHARP_,self__.context,ratio);
});})(this$__$1))
,self__.things))));
});

tt_pong.core.Game.prototype.tt_pong$core$Thing$update$arity$2 = (function (this$,dt){
var self__ = this;
var this$__$1 = this;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc_in(this$__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constant$keyword$_COLON_things,(1)], null),tt_pong.core.update_ball(self__.things)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constant$keyword$_COLON_things], null),((function (this$__$1){
return (function (p1__560_SHARP_){
return cljs.core.vec(cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (t){
return tt_pong.core.update(t,dt);
});})(this$__$1))
,p1__560_SHARP_)));
});})(this$__$1))
);
});

tt_pong.core.Game.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$_COLON_context,null,cljs.core.constant$keyword$_COLON_things,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.Game(self__.things,self__.context,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.Game.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__561){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__565 = cljs.core.keyword_identical_QMARK_;
var expr__566 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__568 = cljs.core.constant$keyword$_COLON_things;
var G__569 = expr__566;
return (pred__565.cljs$core$IFn$_invoke$arity$2 ? pred__565.cljs$core$IFn$_invoke$arity$2(G__568,G__569) : pred__565.call(null,G__568,G__569));
})())){
return (new tt_pong.core.Game(G__561,self__.context,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__570 = cljs.core.constant$keyword$_COLON_context;
var G__571 = expr__566;
return (pred__565.cljs$core$IFn$_invoke$arity$2 ? pred__565.cljs$core$IFn$_invoke$arity$2(G__570,G__571) : pred__565.call(null,G__570,G__571));
})())){
return (new tt_pong.core.Game(self__.things,G__561,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.Game(self__.things,self__.context,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__561),null));
}
}
});

tt_pong.core.Game.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_things,self__.things],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_context,self__.context],null))], null),self__.__extmap));
});

tt_pong.core.Game.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__561){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.Game(self__.things,self__.context,G__561,self__.__extmap,self__.__hash));
});

tt_pong.core.Game.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.Game.cljs$lang$type = true;

tt_pong.core.Game.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/Game");
});

tt_pong.core.Game.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/Game");
});

tt_pong.core.__GT_Game = (function tt_pong$core$__GT_Game(things,context){
return (new tt_pong.core.Game(things,context,null,null,null));
});

tt_pong.core.map__GT_Game = (function tt_pong$core$map__GT_Game(G__563){
return (new tt_pong.core.Game(cljs.core.constant$keyword$_COLON_things.cljs$core$IFn$_invoke$arity$1(G__563),cljs.core.constant$keyword$_COLON_context.cljs$core$IFn$_invoke$arity$1(G__563),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__563,cljs.core.constant$keyword$_COLON_things,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_context], 0)),null));
});


/**
* @constructor
* @param {*} x
* @param {*} y
* @param {*} color
* @param {*} font
* @param {*} __meta
* @param {*} __extmap
* @param {*} __hash
* @param {*=} __meta 
* @param {*=} __extmap
* @param {number|null} __hash
*/
tt_pong.core.Score = (function (x,y,color,font,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.color = color;
this.font = font;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
tt_pong.core.Score.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__11054__auto__,k__11055__auto__){
var self__ = this;
var this__11054__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__11054__auto____$1,k__11055__auto__,null);
});

tt_pong.core.Score.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__11056__auto__,k574,else__11057__auto__){
var self__ = this;
var this__11056__auto____$1 = this;
var G__576 = (((k574 instanceof cljs.core.Keyword))?k574.fqn:null);
switch (G__576) {
case "font":
return self__.font;

break;
case "color":
return self__.color;

break;
case "y":
return self__.y;

break;
case "x":
return self__.x;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k574,else__11057__auto__);

}
});

tt_pong.core.Score.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__11068__auto__,writer__11069__auto__,opts__11070__auto__){
var self__ = this;
var this__11068__auto____$1 = this;
var pr_pair__11071__auto__ = ((function (this__11068__auto____$1){
return (function (keyval__11072__auto__){
return cljs.core.pr_sequential_writer(writer__11069__auto__,cljs.core.pr_writer,""," ","",opts__11070__auto__,keyval__11072__auto__);
});})(this__11068__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__11069__auto__,pr_pair__11071__auto__,"#tt-pong.core.Score{",", ","}",opts__11070__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_color,self__.color],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_font,self__.font],null))], null),self__.__extmap));
});

tt_pong.core.Score.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__11052__auto__){
var self__ = this;
var this__11052__auto____$1 = this;
return self__.__meta;
});

tt_pong.core.Score.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__11048__auto__){
var self__ = this;
var this__11048__auto____$1 = this;
return (new tt_pong.core.Score(self__.x,self__.y,self__.color,self__.font,self__.__meta,self__.__extmap,self__.__hash));
});

tt_pong.core.Score.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__11058__auto__){
var self__ = this;
var this__11058__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

tt_pong.core.Score.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__11049__auto__){
var self__ = this;
var this__11049__auto____$1 = this;
var h__10916__auto__ = self__.__hash;
if(!((h__10916__auto__ == null))){
return h__10916__auto__;
} else {
var h__10916__auto____$1 = cljs.core.hash_imap(this__11049__auto____$1);
self__.__hash = h__10916__auto____$1;

return h__10916__auto____$1;
}
});

tt_pong.core.Score.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__11050__auto__,other__11051__auto__){
var self__ = this;
var this__11050__auto____$1 = this;
if(cljs.core.truth_((function (){var and__10815__auto__ = other__11051__auto__;
if(cljs.core.truth_(and__10815__auto__)){
return ((this__11050__auto____$1.constructor === other__11051__auto__.constructor)) && (cljs.core.equiv_map(this__11050__auto____$1,other__11051__auto__));
} else {
return and__10815__auto__;
}
})())){
return true;
} else {
return false;
}
});

tt_pong.core.Score.prototype.tt_pong$core$Thing$ = true;

tt_pong.core.Score.prototype.tt_pong$core$Thing$draw$arity$3 = (function (this$,context,_){
var self__ = this;
var this$__$1 = this;
var score = cljs.core.constant$keyword$_COLON_score.cljs$core$IFn$_invoke$arity$1((function (){var G__577 = tt_pong.core.app_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__577) : cljs.core.deref.call(null,G__577));
})());
var text = [cljs.core.str(cljs.core.first(score)),cljs.core.str(" - "),cljs.core.str(cljs.core.second(score))].join('');
tt_pong.core.draw_text(context,self__.color,self__.font,text,self__.x,self__.y);

return this$__$1;
});

tt_pong.core.Score.prototype.tt_pong$core$Thing$update$arity$2 = (function (this$,_){
var self__ = this;
var this$__$1 = this;
return this$__$1;
});

tt_pong.core.Score.prototype.tt_pong$core$Thing$center$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.x,self__.y], null);
});

tt_pong.core.Score.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__11063__auto__,k__11064__auto__){
var self__ = this;
var this__11063__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.constant$keyword$_COLON_y,null,cljs.core.constant$keyword$_COLON_color,null,cljs.core.constant$keyword$_COLON_font,null,cljs.core.constant$keyword$_COLON_x,null], null), null),k__11064__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__11063__auto____$1),self__.__meta),k__11064__auto__);
} else {
return (new tt_pong.core.Score(self__.x,self__.y,self__.color,self__.font,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__11064__auto__)),null));
}
});

tt_pong.core.Score.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__11061__auto__,k__11062__auto__,G__573){
var self__ = this;
var this__11061__auto____$1 = this;
var pred__578 = cljs.core.keyword_identical_QMARK_;
var expr__579 = k__11062__auto__;
if(cljs.core.truth_((function (){var G__581 = cljs.core.constant$keyword$_COLON_x;
var G__582 = expr__579;
return (pred__578.cljs$core$IFn$_invoke$arity$2 ? pred__578.cljs$core$IFn$_invoke$arity$2(G__581,G__582) : pred__578.call(null,G__581,G__582));
})())){
return (new tt_pong.core.Score(G__573,self__.y,self__.color,self__.font,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__583 = cljs.core.constant$keyword$_COLON_y;
var G__584 = expr__579;
return (pred__578.cljs$core$IFn$_invoke$arity$2 ? pred__578.cljs$core$IFn$_invoke$arity$2(G__583,G__584) : pred__578.call(null,G__583,G__584));
})())){
return (new tt_pong.core.Score(self__.x,G__573,self__.color,self__.font,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__585 = cljs.core.constant$keyword$_COLON_color;
var G__586 = expr__579;
return (pred__578.cljs$core$IFn$_invoke$arity$2 ? pred__578.cljs$core$IFn$_invoke$arity$2(G__585,G__586) : pred__578.call(null,G__585,G__586));
})())){
return (new tt_pong.core.Score(self__.x,self__.y,G__573,self__.font,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__587 = cljs.core.constant$keyword$_COLON_font;
var G__588 = expr__579;
return (pred__578.cljs$core$IFn$_invoke$arity$2 ? pred__578.cljs$core$IFn$_invoke$arity$2(G__587,G__588) : pred__578.call(null,G__587,G__588));
})())){
return (new tt_pong.core.Score(self__.x,self__.y,self__.color,G__573,self__.__meta,self__.__extmap,null));
} else {
return (new tt_pong.core.Score(self__.x,self__.y,self__.color,self__.font,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__11062__auto__,G__573),null));
}
}
}
}
});

tt_pong.core.Score.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__11066__auto__){
var self__ = this;
var this__11066__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_x,self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_y,self__.y],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_color,self__.color],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.constant$keyword$_COLON_font,self__.font],null))], null),self__.__extmap));
});

tt_pong.core.Score.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__11053__auto__,G__573){
var self__ = this;
var this__11053__auto____$1 = this;
return (new tt_pong.core.Score(self__.x,self__.y,self__.color,self__.font,G__573,self__.__extmap,self__.__hash));
});

tt_pong.core.Score.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__11059__auto__,entry__11060__auto__){
var self__ = this;
var this__11059__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__11060__auto__)){
return cljs.core._assoc(this__11059__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__11060__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__11059__auto____$1,entry__11060__auto__);
}
});

tt_pong.core.Score.cljs$lang$type = true;

tt_pong.core.Score.cljs$lang$ctorPrSeq = (function (this__11088__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"tt-pong.core/Score");
});

tt_pong.core.Score.cljs$lang$ctorPrWriter = (function (this__11088__auto__,writer__11089__auto__){
return cljs.core._write(writer__11089__auto__,"tt-pong.core/Score");
});

tt_pong.core.__GT_Score = (function tt_pong$core$__GT_Score(x,y,color,font){
return (new tt_pong.core.Score(x,y,color,font,null,null,null));
});

tt_pong.core.map__GT_Score = (function tt_pong$core$map__GT_Score(G__575){
return (new tt_pong.core.Score(cljs.core.constant$keyword$_COLON_x.cljs$core$IFn$_invoke$arity$1(G__575),cljs.core.constant$keyword$_COLON_y.cljs$core$IFn$_invoke$arity$1(G__575),cljs.core.constant$keyword$_COLON_color.cljs$core$IFn$_invoke$arity$1(G__575),cljs.core.constant$keyword$_COLON_font.cljs$core$IFn$_invoke$arity$1(G__575),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__575,cljs.core.constant$keyword$_COLON_x,cljs.core.array_seq([cljs.core.constant$keyword$_COLON_y,cljs.core.constant$keyword$_COLON_color,cljs.core.constant$keyword$_COLON_font], 0)),null));
});

tt_pong.core.score_QMARK_ = (function tt_pong$core$score_QMARK_(p__590){
var map__594 = p__590;
var map__594__$1 = ((cljs.core.seq_QMARK_(map__594))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__594):map__594);
var vec__595 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__594__$1,cljs.core.constant$keyword$_COLON_things);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__595,(0),null);
var ball = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__595,(1),null);
var vec__596 = tt_pong.core.center(ball);
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__596,(0),null);
return !((((0) < bx)) && ((bx < tt_pong.core.world_width)));
});
tt_pong.core.score_BANG_ = (function tt_pong$core$score_BANG_(p__597){
var map__601 = p__597;
var map__601__$1 = ((cljs.core.seq_QMARK_(map__601))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__601):map__601);
var vec__602 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__601__$1,cljs.core.constant$keyword$_COLON_things);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__602,(0),null);
var ball = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__602,(1),null);
var vec__603 = tt_pong.core.center(ball);
var bx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__603,(0),null);
var p1_scored_QMARK_ = ((tt_pong.core.world_width - bx) < (0));
var index = ((p1_scored_QMARK_)?(0):(1));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(tt_pong.core.app_state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constant$keyword$_COLON_score,index], null),cljs.core.inc);
});
cljs.core.add_watch(tt_pong.core.game_state,cljs.core.constant$keyword$_COLON_history,(function (_,___$1,___$2,new_state){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.last((function (){var G__604 = tt_pong.core.game_history;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__604) : cljs.core.deref.call(null,G__604));
})()),new_state)){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(tt_pong.core.game_history,cljs.core.conj,new_state);
}
}));
/**
 * Atomically update the state of the game.
 */
tt_pong.core.update_BANG_ = (function tt_pong$core$update_BANG_(old_game,dt){
var G__607 = tt_pong.core.game_state;
var G__608 = tt_pong.core.update(old_game,dt);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__607,G__608) : cljs.core.reset_BANG_.call(null,G__607,G__608));
});
/**
 * Atomically undo the state of the game.
 */
tt_pong.core.undo_BANG_ = (function tt_pong$core$undo_BANG_(old_game,dt){
if((cljs.core.count((function (){var G__613 = tt_pong.core.game_history;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__613) : cljs.core.deref.call(null,G__613));
})()) > (2))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(tt_pong.core.game_history,cljs.core.pop);

var G__614 = tt_pong.core.game_state;
var G__615 = cljs.core.last((function (){var G__616 = tt_pong.core.game_history;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__616) : cljs.core.deref.call(null,G__616));
})());
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__614,G__615) : cljs.core.reset_BANG_.call(null,G__614,G__615));
} else {
return old_game;
}
});
tt_pong.core.simulate_with = (function tt_pong$core$simulate_with(p__617,update_fn,dt){
var map__623 = p__617;
var map__623__$1 = ((cljs.core.seq_QMARK_(map__623))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__623):map__623);
var game = map__623__$1;
var remainder = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__623__$1,cljs.core.constant$keyword$_COLON_remainder,(0));
var target_dt = 16.66666666;
var simulation = (function (){var G__624 = game;
var G__625 = dt;
return (update_fn.cljs$core$IFn$_invoke$arity$2 ? update_fn.cljs$core$IFn$_invoke$arity$2(G__624,G__625) : update_fn.call(null,G__624,G__625));
})();
var accumulator = (dt + remainder);
while(true){
if((accumulator < target_dt)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(simulation,cljs.core.constant$keyword$_COLON_remainder,accumulator),(accumulator / target_dt)], null);
} else {
var G__628 = (function (){var G__626 = simulation;
var G__627 = target_dt;
return (update_fn.cljs$core$IFn$_invoke$arity$2 ? update_fn.cljs$core$IFn$_invoke$arity$2(G__626,G__627) : update_fn.call(null,G__626,G__627));
})();
var G__629 = (accumulator - target_dt);
simulation = G__628;
accumulator = G__629;
continue;
}
break;
}
});
tt_pong.core.simulate_and_draw_with = (function tt_pong$core$simulate_and_draw_with(game,update_fn,dt){
return (function (p1__630_SHARP_){
return tt_pong.core.draw(cljs.core.first(p1__630_SHARP_),null,cljs.core.second(p1__630_SHARP_));
}).call(null,tt_pong.core.simulate_with(game,update_fn,dt));
});
tt_pong.core.is_asking_for_rewind_QMARK_ = (function tt_pong$core$is_asking_for_rewind_QMARK_(){
return tt_pong.core.key_is_pressed_QMARK_(cljs.core.constant$keyword$_COLON_space);
});
tt_pong.core.play_BANG_ = (function tt_pong$core$play_BANG_(game,t1,t2){
var dt = (t2 - (function (){var or__10823__auto__ = t1;
if(cljs.core.truth_(or__10823__auto__)){
return or__10823__auto__;
} else {
return t2;
}
})());
if(cljs.core.not(tt_pong.core.is_asking_for_rewind_QMARK_())){
return ((function (dt){
return (function (p1__631_SHARP_){
if(!(tt_pong.core.score_QMARK_(p1__631_SHARP_))){
return tt_pong.core.request_animation_frame_BANG_.cljs$core$IFn$_invoke$arity$variadic(tt_pong$core$play_BANG_,cljs.core.array_seq([p1__631_SHARP_,t2], 0));
} else {
tt_pong.core.score_BANG_(p1__631_SHARP_);

return tt_pong.core.restart();
}
});})(dt))
.call(null,tt_pong.core.simulate_and_draw_with(game,tt_pong.core.update_BANG_,dt));
} else {
return ((function (dt){
return (function (p1__632_SHARP_){
return tt_pong.core.request_animation_frame_BANG_.cljs$core$IFn$_invoke$arity$variadic(tt_pong$core$play_BANG_,cljs.core.array_seq([p1__632_SHARP_,t2], 0));
});})(dt))
.call(null,tt_pong.core.simulate_and_draw_with(game,tt_pong.core.undo_BANG_,dt));
}
});
tt_pong.core.start = (function tt_pong$core$start(){
(tt_pong.core.stop.cljs$core$IFn$_invoke$arity$0 ? tt_pong.core.stop.cljs$core$IFn$_invoke$arity$0() : tt_pong.core.stop.call(null));

tt_pong.core.draw((function (){var G__636 = tt_pong.core.game_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__636) : cljs.core.deref.call(null,G__636));
})(),null,(0));

var G__637 = cljs.core.partial.cljs$core$IFn$_invoke$arity$3(tt_pong.core.play_BANG_,(function (){var G__638 = tt_pong.core.game_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__638) : cljs.core.deref.call(null,G__638));
})(),null);
return (tt_pong.core.start_animation.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.start_animation.cljs$core$IFn$_invoke$arity$1(G__637) : tt_pong.core.start_animation.call(null,G__637));
});
tt_pong.core.stop = (function tt_pong$core$stop(){
var G__641 = cljs.core.constant$keyword$_COLON_rafid.cljs$core$IFn$_invoke$arity$1((function (){var G__642 = tt_pong.core.app_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__642) : cljs.core.deref.call(null,G__642));
})());
return (tt_pong.core.stop_animation.cljs$core$IFn$_invoke$arity$1 ? tt_pong.core.stop_animation.cljs$core$IFn$_invoke$arity$1(G__641) : tt_pong.core.stop_animation.call(null,G__641));
});
tt_pong.core.setup = (function tt_pong$core$setup(){
var context = tt_pong.core.get_context("game");
var world = tt_pong.core.map__GT_World(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$_COLON_width,tt_pong.core.world_width,cljs.core.constant$keyword$_COLON_height,tt_pong.core.world_height,cljs.core.constant$keyword$_COLON_color,tt_pong.core.world_color], null));
var vec__649 = tt_pong.core.random_velocity(tt_pong.core.difficulty);
var vx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__649,(0),null);
var vy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__649,(1),null);
var vec__650 = tt_pong.core.center(world);
var xc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__650,(0),null);
var yc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__650,(1),null);
var yoffset = (yc - (tt_pong.core.player_height / (2)));
var xai = tt_pong.core.player_offset;
var xp = ((tt_pong.core.world_width - tt_pong.core.player_width) - xai);
var ball = tt_pong.core.map__GT_Ball(new cljs.core.PersistentArrayMap(null, 8, [cljs.core.constant$keyword$_COLON_width,tt_pong.core.ball_size,cljs.core.constant$keyword$_COLON_height,tt_pong.core.ball_size,cljs.core.constant$keyword$_COLON_x,(290),cljs.core.constant$keyword$_COLON_y,(190),cljs.core.constant$keyword$_COLON_px,(290),cljs.core.constant$keyword$_COLON_py,(190),cljs.core.constant$keyword$_COLON_vx,vx,cljs.core.constant$keyword$_COLON_vy,vy], null));
var player1 = tt_pong.core.map__GT_AIPlayer(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.constant$keyword$_COLON_width,tt_pong.core.player_width,cljs.core.constant$keyword$_COLON_height,tt_pong.core.player_height,cljs.core.constant$keyword$_COLON_x,xai,cljs.core.constant$keyword$_COLON_y,yoffset,cljs.core.constant$keyword$_COLON_px,xai,cljs.core.constant$keyword$_COLON_py,yoffset], null));
var player2 = tt_pong.core.map__GT_Player(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.constant$keyword$_COLON_width,tt_pong.core.player_width,cljs.core.constant$keyword$_COLON_height,tt_pong.core.player_height,cljs.core.constant$keyword$_COLON_x,xp,cljs.core.constant$keyword$_COLON_y,yoffset,cljs.core.constant$keyword$_COLON_px,xp,cljs.core.constant$keyword$_COLON_py,yoffset], null));
var gamescore = tt_pong.core.__GT_Score(((300) - (60)),(50),"#fff","40px Courier");
var G__651_655 = tt_pong.core.game_state;
var G__652_656 = tt_pong.core.__GT_Game(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [world,ball,player1,player2,gamescore], null),context);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__651_655,G__652_656) : cljs.core.reset_BANG_.call(null,G__651_655,G__652_656));

var G__653 = tt_pong.core.start;
var G__654 = (500);
return (tt_pong.core.timeout.cljs$core$IFn$_invoke$arity$2 ? tt_pong.core.timeout.cljs$core$IFn$_invoke$arity$2(G__653,G__654) : tt_pong.core.timeout.call(null,G__653,G__654));
});
var G__657_660 = (function (){return goog.dom.getWindow();
})();
var G__658_661 = "load";
var G__659_662 = tt_pong.core.setup;
goog.events.listen(G__657_660,G__658_661,G__659_662);
