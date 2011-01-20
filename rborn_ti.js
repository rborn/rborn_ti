/*
Copyright (c) 2010 Daniel Tamas 
http://rborn.info

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var log = Titanium.API.info;
var error = Titanium.API.error;

var ti_ver = parseInt(Titanium.version.replace(/\./gi,''),0 );


var $empty = function(){;};

var rel = function(r_tag,r_properties,events) {
	if ( !r_properties) {r_properties = {};};
	if ( !events) {events = {};};
	
	var el;
	switch(r_tag) {
		case 'img':
		
		if ( ti_ver > 130 ) {
			if ( !r_properties.image ) {r_properties.image = r_properties.url;};
			delete r_properties.url;
		} 
		
		el = Titanium.UI.createImageView(r_properties);
		break;
		
		case 'input':
		el = Titanium.UI.createTextField(r_properties);
		break;
		
		case 'textarea':
		el = Titanium.UI.createTextArea(r_properties);
		break;
		
		case 'iad':
	
		el =  Titanium.UI.iOS.createAdView(r_properties);
		break;

		case 'label':
		el = Titanium.UI.createLabel(r_properties);
		break;
		
		case 'view':
		el = Titanium.UI.createView(r_properties);
		break;
		
		case 'webview':
		el = Titanium.UI.createWebView(r_properties);
		break;
		
		case 'window':
		el = Titanium.UI.createWindow(r_properties);
		break;
		
		case 'button':
		el = Titanium.UI.createButton(r_properties);
		break;
		
		case 'flex_space':
		el = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		break;
		
		case 'toolbar':
		el = Titanium.UI.createToolbar(r_properties);
		break;

		case 'searchbar':
		el = Titanium.UI.createSearchBar(r_properties);
		break;

		
		case 'table':
		el =  Titanium.UI.createTableView(r_properties);
		break;
		
		case 'tablerow':
		el =  Titanium.UI.createTableViewRow(r_properties);
		break;

		case 'tablesection':
		el =  Titanium.UI.createTableViewSection(r_properties);
		break;


		case 'picker':
		
		el = Titanium.UI.createPicker(r_properties);
		break;
		
		
		
		//;a;;a;aa;a;;a


		case 'buttonbar':
		!!r_properties.style ? false : r_properties.style = Titanium.UI.iPhone.SystemButtonStyle.BAR;
		el =  Titanium.UI.createButtonBar(r_properties);
		break;
		
		case 'tabbedbar':
		!!r_properties.style ? false : r_properties.style = Titanium.UI.iPhone.SystemButtonStyle.BAR;
		el = Titanium.UI.createTabbedBar(r_properties);
		break;
		
		case 'slider':
		el =  Titanium.UI.createSlider(r_properties);
		break;

		case 'tabgroup':
		el =  Titanium.UI.createTabGroup(r_properties);
		break;
		
		case 'tab':
		r_properties.window =  !!r_properties.window.el ? r_properties.window.el : r_properties.window;
		
		el =  Titanium.UI.createTab(r_properties);
		break;

		case 'navigationgroup':
		r_properties.window =  !!r_properties.window.el ? r_properties.window.el : r_properties.window;
		el = Titanium.UI.iPhone.createNavigationGroup(r_properties);
		break;

		case 'switch':
		(!!r_properties.value) ? false : r_properties.value = false;
		el =  Titanium.UI.createSwitch(r_properties);
		break;



		case 'split_view':
		r_properties.detailView =  !!r_properties.detailView.el ? r_properties.detailView.el : r_properties.detailView;
		r_properties.masterView =  !!r_properties.masterView.el ? r_properties.masterView.el : r_properties.masterView;
		el =  Titanium.UI.iPad.createSplitWindow(r_properties);
		break;
		
		
		case 'alert':
		el = Titanium.UI.createAlertDialog(r_properties);
		break;
		
		
		case 'popover':
		el = Titanium.UI.iPad.createPopover(r_properties);
		break;
		
		case 'loading':
		el = Titanium.UI.createActivityIndicator(r_properties);
		break;
		
		
		
		case 'scrollview':
		el = Titanium.UI.createScrollView(r_properties);
		break;


		case 'scrollableview':
		el = Titanium.UI.createScrollableView(r_properties);
		break;
		
		
		case 'gmap':
		el = Titanium.Map.createView(r_properties);
		break;
		
		
		case 'mappin':
		el = Titanium.Map.createAnnotation(r_properties);
		break;
		 
		
		case 'optiondialog':
			el = Titanium.UI.createOptionDialog(r_properties);
		break;
		
		case 'emaildialog':

		el = Titanium.UI.createEmailDialog();
		
		!!(r_properties.subject) ? el.subject = r_properties.subject :  false;
		!!(r_properties.to) ? el.toRecipients = r_properties.to : false;
		!!(r_properties.message) ? el.messageBody = r_properties.message : false;
		
		if ( typeof(r_properties.attachment) == 'string' ) {
			var f = Titanium.Filesystem.getFile(r_properties.attachment);
			el.addAttachment(f);
		}
		else if( r_properties.attachment){
			el.addAttachment(r_properties.attachment);
		}
		break;
		


		
	};


	el.r_tag=r_tag;
	el.r_properties = r_properties; 

	var kids = [];
	var out =  {
		el: el,
		r_tag:r_tag,
		r_properties:r_properties,
		r_id: new Date().getTime(),
		kids:kids,
		set: function() {
			var itemEls = [];
			if ( arguments.length == 2 ) {
				if (r_tag == 'toolbar' && arguments[0] == 'items') {
					
					for (var i = arguments[1].length - 1; i >= 0; i--){
						itemEls.push(!!arguments[1][i].el ? arguments[1][i].el : arguments[1][i] );
					};
					el.items = itemEls;
				}
				else {
						if ( r_tag == 'img' && arguments[0] == 'url' && ti_ver > 130 ) {
							arguments[0] = 'image';
						}
						
						el[arguments[0]] = !!arguments[1].el ? arguments[1].el : arguments[1];
				}
			}
			else {
				var props = arguments[0];
				for ( var pr in props ) {
					if (r_tag == 'toolbar' && pr == 'items') {
						for (var i = props[pr].length - 1; i >= 0; i--){
							itemEls.push(!!props[pr][i].el ? props[pr][i].el : props[pr][i] );
						};
						el.items = itemEls;
					}

					else {
					 el[pr] = !!props[pr].el ? props[pr].el : props[pr];
					}
				};
			}
		return this;	
		},		
		get: function(what) {
			return el[what];
		},
		addEvent: function( ev, fn ) {
			if ( r_tag == 'table' && ev == 'delete') {
				el.addEventListener(ev, function(e) {
					out.refresh();
					fn(e);
				}); return this;

			}
			
			el.addEventListener(ev, fn); return this;
		},
		add: function(obj) {
			obj.r_parent = el;
			el.add(!!obj.el ? obj.el : obj);
			this.kids.push(obj);
			return this;
		},
		dispose: function() {
			el.r_parent.remove(el);
			return this;
		},
		remove: function(obj) {
			el.remove(!!obj.el ? obj.el : obj);
			
			var to_splice = false;
			
			for (var i=0; i < this.kids.length; i++) {
				if ( this.kids[i].r_id && obj.r_id && this.kids[i].r_id == obj.r_id ) {
					to_splice = i;
				}
			};

			if ( to_splice) {this.kids.splice(to_splice,1);}
			return this;
		},
		empty: function() {

			if ( this.kids && this.kids.length ) {
				for (var i=0; i < this.kids.length; i++) {
					if ( this.kids[i] ) {this.remove( this.kids[i] );}		
				};
			}
			this.kids=[];
		},
		inject: function(obj) {
			el.r_parent = obj;
			obj.add(el);
			// obj.el ? obj.add(el) : obj.add(el.el);
		 	return this;
		},
		
		
		clone: function(with_kids, clone_kids ) {
			var cloned = new rel(this.r_tag,this.r_properties ); // to add events
			if ( with_kids ) {
				if ( clone_kids ) {
					
				}
				else {
					for (var i=0; i < this.kids.length; i++) {
						cloned.add(this.kids[i]);
					};	
				}
			}
			
			return cloned;
		},
		
		show: function(opts){
			el.show(opts); return this;
		},
		hide: function(opts){
			if ( r_tag == 'popover' ) {el.fireEvent('hide');}
			el.hide(opts); return this;
		},
		animate: function(animation) {
			var anim = !!animation.anim ? animation.anim : animation;
			el.animate(anim); return this;
		},
		toImage: function() {
			return el.toImage();
		},
		do_fn: function( fn, arg, ret ) {
			if ( typeof(el[fn]) == 'function' ) {
				if( !!ret ) {return el[fn](arg);}
				else {el[fn](arg);}
			}
			return this;
		}
		
	};



	for ( var ev in events ) {
		out.addEvent(ev, events[ev]);
	};
	
	switch(r_tag) {
		case 'window':
		out.open = function(opts) { el.open(opts); return this; };
		out.close = function(opts) { el.close(opts); return this; };
		out.hideNavBar = function(opts){ el.hideNavBar(opts); return this; };
		out.showNavBar = function(opts){ el.showNavBar(opts); return this; };
                                                       
		out.hideTabBar = function(opts){ el.hideTabBar(opts); return this; };
		out.showTabBar = function(opts){ el.showTabBar(opts); return this; };

		out.setRightNavButton = function(button) {
			el.setRightNavButton( (!!button && !!button.el) ? button.el : button);
			return this;
		};
		out.setLeftNavButton = function(button) {
			el.setLeftNavButton( (!!button && !!button.el) ? button.el : button);
			return this;
		};
		
		break;
		
		case 'split_view':
		out.open = function(opts) { el.open(opts); return this; };
		// out.close = function(opts) { el.close(opts); return this; };
		// out.hideNavBar = function(){ el.hideNavBar(); };
		// out.showNavBar = function(){ el.showNavBar(); };
		break;


		case 'scrollview':
		
		// log(el.scrollTo);
		// log(typeof el.scrollTo);
		
		out.scrollTo =  function(x,y){
			el.scrollTo(x,y);
			return this;
		};
		break;
		
		
		case 'scrollableview':
		
		out.scrollToView =  function(idx) {
			el.scrollToView(idx); return this;
		};
		break;
		
		case 'navigationgroup':
		
		out.open = function(what,opts) {
			!!opts ? false : opts={animated:false};


			if ( what && what.el ) {
				el.open( what.el, opts );
			}
			else {
				el.open( what, opts);
			}
		return this;	
		};
		
		out.close = function(opts) { el.close(opts); return this; };
		
		break;
		
		
		case 'tab':

		out.open = function(what,opts) {
			if ( what && what.el ) {
				el.open( what.el, opts );
			}
			else {
				el.open( what, opts);
			}
		return this;	
		};	

		out.close = function(what,opts) { 
			if ( what && what.el ) {
				el.close( what.el, opts );
			}
			else el.close(what,opts); 
		return this; 
		};
		// out.add =  function(tab) { el.addTab(tab.el); return this; };
		
		break;
		
		case 'tabgroup':
		out.history_manager = {};
		out.open = function(opts) {el.open(opts); return this; };
		out.close = function(opts) { el.close(opts); return this; };
		out.add =  function(tab) { el.addTab(tab.el); return this; };
		out.remove =  function(tab) { el.removeTab(tab.el); return this; };
		
		break;

		case 'table':
	
		
		out.scrollToIndex =  function(idx,params) {
			this.el.scrollToIndex(idx,params); return this;
		};
		
		out.appendRow =  function(row, animation ) {
			var row = !!row.el ? row.el : row;
			var animation = (!!animation && !!animation.anim) ? animation.anim : (!!animation ? animation : null );
			this.el.appendRow(row);
			return this;
		};

		out.appendRows =  function(rows, animation ) {
			for ( var r=0;r<rows.length;r++) {
				var row = !!rows[r].el ? rows[r].el : rows[r];
				this.el.appendRow(row);
			}
			return this;
		};

		out.deleteRow =  function(idx, animation) {
			// var row = !!row.el ? row.el : row;
			var animation = (!!animation && !!animation.anim) ? animation.anim : (!!animation ? animation : null );
			this.el.deleteRow(idx);
			this.el.fireEvent('delete');
			return this;
		};
		
		out.selectRow =  function(idx) {
			this.el.selectRow(idx);
		};
		
		out.refresh =  function() {
			var new_rows = [];


			this.sections = this.el.data;

			if ( this.sections ) {
				for(var i = 0; i < this.sections.length; i++)
				{
				    var section = this.sections[i];

				    for(var j = 0; j < section.rowCount; j++)
				    {
				        var row = section.rows[j];
				        new_rows.push(row);
				    }
				}
			}
			
			this.rows = new_rows;

			
		};
		
		out.setData = function(data,animation){ 
			
			var unique_classname = new Date().getTime();

			

			// log('we set data');
			var real_data = [];

			if (data && data[0] && data[0].el ) {

				each(data, function(the_row) {
					the_row.el.className = the_row.el.className || unique_classname;
					real_data.push(the_row.el);
				});

			}
			else {
				each(data, function(the_row) {
					the_row.className = the_row.className || unique_classname;
					real_data.push(the_row);
				});

			};

			this.el.setData(real_data,animation);

			setTimeout(function() {
				// log('we refresh');
				out.refresh();
				},100);

			return this; 
		};


		out.setContentInsets = function(data,animation){
			this.el.setContentInsets(data,animation);
			return this;
		};


		if (r_properties.data && r_properties.data[0] && r_properties.data[0].el ) {
			out.setData(data);
		};
		

		
		break;
		
		
		case 'gmap':
		out.addRoute =  function(route) { el.addRoute(route); return this;};
		out.addAnnotation =  function(pin) { el.addAnnotation( !!pin.el ? pin.el : pin ); return this;};
		out.removeAllAnnotations =  function() { el.removeAllAnnotations(); return this; };
		break;
		
		case 'input':
		out.blur = function(){ el.blur(); return this; };
		out.focus = function(){ el.focus(); return this; };
		// case 'tablerow':
		// out.rowData = el.rowData;
		break;

		case 'searchbar':
		out.blur = function(){ el.blur(); return this; };
		out.focus = function(){ el.focus(); return this; };
		// case 'tablerow':
		// out.rowData = el.rowData;
		break;

		case 'textarea':
		out.blur = function(){ el.blur(); return this; };
		out.focus = function(){ el.focus(); return this; };
		// case 'tablerow':
		// out.rowData = el.rowData;
		break;

		case 'picker':
		out.rows_data =  r_properties.rows_data;
		out.el.add(r_properties.rows_data);
		out.getSelectedRow = function(col_id){ return el.getSelectedRow(col_id); };		
		out.setSelectedRow = function(col_id, row_id, animated){
			animated = ( animated === false ) ? false : true;
			return el.setSelectedRow(col_id,row_id, animated); };
		break;
		
		
		case 'emaildialog':
		out.open = function() { el.open(); return this; };
		break;
		
		case 'optiondialog':
		out.show = function() { el.show(); return this; };
		break;
		

		
	};
	
	
	return out;
};


var rsnd = function(file, opts ) {
	var snd_arr = [];
	var s;
		
	if ( typeof file == 'string') {	s = Titanium.Media.createSound({url:file,idx:0}); }
	else {
	
		
		for (var i=0; i < file.length; i++) {
			var snd = Titanium.Media.createSound({url:file[i],idx:i});
			if ( i == 0 ) { s = snd; }
			if ( i < file.length ) {
				snd.addEventListener('complete', function(e) {
					snd_arr[e.source.idx+1].play();
					out.sound = snd_arr[e.source.idx+1];
					snd_arr[e.source.idx].release();
				});
			snd_arr.push(snd);
			}
			else {
				s = Titanium.Media.createSound({url:file[i],idx:i});
				snd_arr.push(s);
			}
		};
	}
	
	
	
	
	// we need a way to concatenate files
	
		var out =  {
		snd_arr:snd_arr,	
		sound:s,
		// snd_arr:snd_arr,	
		addEvent: function( ev, fn ) {
			if ( this.snd_arr.length ) {
				var last_sound = this.snd_arr[this.snd_arr.length-1];
				last_sound.addEventListener(ev, fn ); return this;
			}
			else {
				this.sound.addEventListener(ev, fn ); return this;
			}
		},
		removeEvent: function(ev) {
			this.sound.removeEventListener(ev); return this;
		},
		play: function(){
			// 	log('s '+this.sound);
			// if ( this.snd_arr.length ) this.snd_arr[0].play();
			// else this.sound.play(); 
			this.sound.play();
			
			return this;
		},
		stop: function(){
			if ( this.sound.isPlaying() ) {this.sound.stop();}
			return this;
		},
		release: function() {
			this.stop();
			this.sound.release(); 
			return this;
		},
		set: function(new_file) {
			this.sound.url = new_file; return this;
		}
			
	};
	
	return out;
};	



var ranim = function(props,events){
	var anim = Titanium.UI.createAnimation();

	for ( var pr in props ) {
		(pr == 'transform' && !!props[pr].tr) ? anim[pr] = props[pr].tr : anim[pr] = props[pr];
		(pr == 'view' && !!props[pr].el) ? anim[pr] = props[pr].el : anim[pr] = props[pr];
	};
	
	for ( var ev in events ) {
		 anim.addEventListener(ev, events[ev]);
	};

	var out = {
		anim:anim,
		set: function() {
			if ( arguments.length == 2 ) {
					anim[arguments[0]] = arguments[1];
			}
			else {
				var props = arguments[0];
				for ( var pr in props ) {
					anim[pr] = props[pr];
				};
			}
		return this;	
		},
		addEvent: function( ev, fn ) {
			anim.addEventListener(ev, fn );
			return this;
		}
	};
	
	return out;
	
};



var rtrans =  function(anim_type, opts) {
	var tr = (anim_type=='2d') ? Titanium.UI.create2DMatrix() : Titanium.UI.create3DMatrix();
	
	for ( var op in opts ) {
		tr = eval( 'tr.'+op+'('+opts[op]+')' );
	}
	var out = {
		tr:tr
	};
	return out;
};



// timer 


var rtimer =  function( m , s, fn_tick, fn_end  ) {
	return {
		total_sec:m*60+s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m,0)*60+parseInt(s,0);
			this.time = {m:m,s:s};
			return this;
		},
		start: function() {
			var self = this;
			
			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60,0), s: (self.total_sec%60) };
					fn_tick();
				}
				else {
					self.stop();
				}
				}, 1000 );
			return this;
		},
		stop: function() {
			clearInterval(this.timer);
			// this.time = {m:0,s:0};
			// this.total_sec = 0;
			fn_end();
			return this;
		}

	};
};

// persistent settings

var r_persist =  function(name,jsondata) {
	
	
	var out= {
		dispose: function(name) {
			Titanium.App.Properties.setString(name,'');
		},
		set: function(name,jsondata) {
			Titanium.App.Properties.setString(name, JSON.stringify( jsondata ) );
			this[name] = jsondata;
		},
		get: function(name) {
			if ( Titanium.App.Properties.getString(name) ){
				this[name] = JSON.parse( Titanium.App.Properties.getString(name) );
				}
			else { this[name] = false;}
				
			return this;
		},
		ret: function(name) {
		  var retVal = get(name);
		  return retVal[name];
		}
	};


	// if ( name && jsondata && !Titanium.App.Properties.getString(name) ) {
	if ( name && jsondata ) {
			out.set(name,jsondata);
	}
	else if ( name ) {
		out.get(name);
	}
	return out;
};


// database

var rdb = function(database) {
	if ( database )	{var db = Titanium.Database.open(database);}
	else {db = null;}
	return {
		db:db,
		results:null,
		install: function(path, database) {
			
			this.db = Titanium.Database.install(path,database);
			return this;	
		},
		open: function(database) {
			this.db = Titanium.Database.open(database);
			return this;
		},
		execute: function(sql) {
			this.results = this.db.execute(sql);
			return this;
		},
		close: function() {
			this.db.close();
			this.db =  null;
			this.results =  null;
			return this;
		},
		dispose: function() {
			this.db.remove();
			this.db =  null;
			this.results =  null;
			return this;
		},
		remove: function() {
			return this;
		},
		insert: function(dataset) {
			return this;
		},
		update: function() {
			return this;
		},
		get: function(what) {
			return this.db[what];
		},
		'export_results': function(format) {
			// default is json
			
				var export_data='';

				var nr_fields = this.results.fieldCount();


				var header = [];


				if ( nr_fields > 0 ) {
					for (var i=0; i < nr_fields; i++) {
						header.push(this.results.fieldName(i));
					};


					if ( format == 'csv' ) {
						export_data = [];
						export_data.push(header.join(','));
				
						while (this.results.isValidRow() ) {
								var row = [];
								for (var i=0; i < nr_fields; i++) {
									row.push(this.results.field(i));
								};

								export_data.push(row.join(','));
								this.results.next();
							}					

						return export_data.join('\n');
					}
					else {
						export_data = [];

						while (this.results.isValidRow() ) {
								var row = {};
								for (var i=0; i < nr_fields; i++) {
									row[ header[i] ] = this.results.field(i);
								};

								export_data.push(row);
								this.results.next();
							}					

						return export_data;
						
					}

					
				}
				
				return false;
		}
	};
};



var r_ajax =  function(url,on_ok, on_err, method, async, props) {
	var async = (async === false) ? false : true;
	var method = !!method ? method : 'POST';
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.setTimeout(30000);

	xhr.open(method,url,async);




	xhr.onload = function(){
		on_ok(this);
		xhr.abort();
	};
		
	xhr.onerror = function(e){
		on_err(e);
		xhr.abort();
	};	
	
	xhr.onsendstream = function(e){
		log(e);
	};

	return {
		xhr:xhr,
		method:method,
		send:function(data) {
			(this.method == 'GET') ? xhr.send() : xhr.send(data);
			return this;
		},
		setRequestHeader: function(header,value){
			xhr.setRequestHeader(header,value);
			return this;
		},
		abort:function() { 
			xhr.abort();
			return this;
		}
	};
};


var get_remote_file =  function(filename, url, fn_end, fn_progress ) {
	var file_obj = {file:filename, url:url, path: null};
	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	if ( file.exists() ) {
		file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
		fn_end(file_obj);
	}
	else {

		if ( check_network() ) {
			var c = Titanium.Network.createHTTPClient();

			c.setTimeout(10000);
			c.onload = function()
			{

				if (c.status == 200 ) {
					log('finished downloading '+ filename +' from '+url);

					var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
					f.write(this.responseData);
					file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
				}

				else {
					file_obj.error = 'file not found'; // to set some errors codes
				}
				fn_end(file_obj);

			};
			c.ondatastream = function(e)
			{
				log('progress '+ filename +':'+e.progress);
				if ( fn_progress ) {fn_progress(e.progress);}
			};
			c.error = function(e)
			{
				log('error '+e.error);
				file_obj.error = e.error;
				fn_end(file_obj);
			};
			c.open('GET',url);
			c.send();			
		}
		else {
			file_obj.error = 'no internet';
			fn_end(file_obj);
		}
		

	}
};



function check_network() {
	return Titanium.Network.online;
} 


function check_geo(){
	if (Titanium.Geolocation.locationServicesEnabled==false) return false;
	if ( Titanium.Platform.name != 'android' ) {
		
	}
}




// rand array sort

function randOrd() { return (Math.round(Math.random())-0.5); }
function randNr(nr) { return Math.floor(Math.random()*(nr+1) ); }

function get_rand(arr,nr) {
	arr.sort(randOrd);
	
	if (!nr || nr==1) {return arr[0];}
	else {return arr.slice(0,nr);}
	
}

// utils

function leadingZeros(num, totalChars, padWith) {
	num = num + "";
	padWith = (padWith) ? padWith : "0";
	if (num.length < totalChars) {
		while (num.length < totalChars) {
			num = padWith + num;
		}
	} else {}

	if (num.length > totalChars) { //if padWith was a multiple character string and num was overpadded
		num = num.substring((num.length - totalChars), totalChars);
	} else {}

	return num;
}


chain = function(args) {  
    return function() {  
     for(var i = 0; i < args.length; i++) {  
      args[i]();  
     }  
    };  
   };







// timeout fix ??



function timeoutObject() { this.flag = true; }

function mySetTimeout(callback, time) {
	var myCallback = callback;
	if (typeof callback == 'string') {
		myCallback = function() { eval(callback); };
	}
	var timerobj = new timeoutObject();
	setTimeout(function () { 
		if (timerobj.flag) { myCallback(); }
	}, time);
	return timerobj;
}

function myClearTimeout(timer) {
	if (timer.flag) {timer.flag = false;}
}



function in_array(array,needle) {

	  for (var i=0;i<array.length;i++) {
	    if(array[i] == needle){ return true; }
	  }
	  return false;
}

function unique(a)
{
   var r = [];
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = i + 1 ; x < n; x++)
      {
         if(a[x]==a[i]) {continue o;}
      }
      r[r.length] = a[i];
   }
   return r;
}

function date(j,k){var l=this,d,a,h=/\\?([a-z])/gi,g,e=function(b,c){return(b+="").length<c?Array(++c-b.length).join("0")+b:b;},i=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],m={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};g=function(b,c){return a[b]?a[b]():c;};

a={d:function(){return e(a.j(),2);},D:function(){return a.l().slice(0,3);},j:function(){return d.getDate();},l:function(){return i[a.w()]+
"day";},N:function(){return a.w()||7;},S:function(){return m[a.j()]||"th";},w:function(){return d.getDay();},z:function(){var b=new Date(a.Y(),a.n()-1,a.j()),c=new Date(a.Y(),0,1);return Math.round((b-c)/864E5)+1;},W:function(){var b=new Date(a.Y(),a.n()-1,a.j()-a.N()+3),c=new Date(b.getFullYear(),0,4);return 1+Math.round((b-c)/864E5/7);},

F:function(){return i[6+a.n()];},m:function(){return e(a.n(),2);},M:function(){return a.F().slice(0,3);},n:function(){return d.getMonth()+1;},t:function(){return(new Date(a.Y(),
a.n(),0)).getDate();},L:function(){var b=a.Y(),c=b%400,f=b%100;return 0+(!(b&3)&&(f||!c));},o:function(){var b=a.n(),c=a.W();return a.Y()+(b===12&&c<9?-1:b===1&&c>9);},

Y:function(){return d.getFullYear();},y:function(){return(a.Y()+"").slice(-2);},a:function(){return d.getHours()>11?"pm":"am";},A:function(){return a.a().toUpperCase();},B:function(){var b=d.getUTCHours()*3600,c=d.getUTCMinutes()*60,f=d.getUTCSeconds();return e(Math.floor((b+c+f+3600)/86.4)%1E3,3);},g:function(){return a.G()%12||12;},G:function(){return d.getHours();},


h:function(){return e(a.g(),2);},H:function(){return e(a.G(),2);},i:function(){return e(d.getMinutes(),2);},s:function(){return e(d.getSeconds(),2);},u:function(){return e(d.getMilliseconds()*1E3,6);},

e:function(){return"UTC";},I:function(){var b=new Date(a.Y(),0),c=Date.UTC(a.Y(),0),f=new Date(a.Y(),6),n=Date.UTC(a.Y(),6);return 0+(b-c!==f-n);},O:function(){var b=d.getTimezoneOffset();return(b>0?"-":"+")+e(Math.abs(b/60*100),4);},P:function(){var b=a.O();return b.substr(0,3)+":"+b.substr(3,2);},T:function(){return"UTC";},
Z:function(){return-d.getTimezoneOffset()*60;},c:function(){return"Y-m-d\\Th:i:sP".replace(h,g);},r:function(){return"D, d M Y H:i:s O".replace(h,g);},U:function(){return d.getTime()/1E3|0;}};this.date=function(b,c){l=this;d=typeof c==="undefined"?new Date:c instanceof Date?new Date(c):new Date(c*1E3);return b.replace(h,g);};return this.date(j,k);};


function isUnsignedInteger(s) {
  return (s.toString().search(/^[0-9]+$/) == 0);
}

function trim(a){return a.replace(/^\s+|\s+$/g,"");};
function ltrim(a){return a.replace(/^\s+/,"");};
function rtrim(a){return a.replace(/\s+$/,"");};


function each(obj, fn ) {
	for( var i in obj ) {
		fn(obj[i]);
	}
}


function parseIsoDate(s){
	var re=/(\d\d\d\d)\D?(\d\d)\D?(\d\d)\D?(\d\d)\D?(\d\d\D?(\d\d\.?(\d*))?)(Z|[+-]\d\d?(:\d\d)?)?/;
	var a=re.exec(s).slice(1).map(function(x,i){
	
	if (i==6 && x) {x=parseInt(x,10)/Math.pow(10,x.length)*1000;} // convert to milliseconds
		return parseInt(x,10)||0;
	});

	return new Date(Date.UTC(a[0],a[1]-1,a[2],a[3]-(a[7]||0),a[4],a[5],a[6]));
};


function isUnsignedInteger(s) {
  return (s.toString().search(/^[0-9]+$/) == 0);
};

function trim(a){return a.replace(/^\s+|\s+$/g,"");};
function ltrim(a){return a.replace(/^\s+/,"");};
function rtrim(a){return a.replace(/\s+$/,"");};


function each(obj, fn ) {
	for( var i in obj ) {
		fn(obj[i]);
	}
};


function merge(obj1,obj2) {
	var res = {};
	
	for( attrname in obj1 ) {
		res[attrname] = obj1[attrname];
	}
	
	for (attrname in obj2) { 
		res[attrname] = obj2[attrname];
		}
	return res;
};




function filter(obj,fn){
		var results = [];
		for( var i in obj ) {
			if ( fn(obj[i]) ) {results.push(obj[i]);}
		}
		return results;
};
	



function mask(str,m) {
	    var m, l = (m = m.split("")).length, s = str.split(""), j = 0, h = "";
	    for(var i = -1; ++i < l;){
	        if (m[i] != "#") {
	            if(m[i] == "\\" && (h += m[++i])) {continue;}
	            h += m[i];
	            i + 1 == l && (s[j - 1] += h,h = "");
	        }
	        else {
	            if(!s[j] && !(h = "")) {break;}
	            (s[j] = h + s[j++]) && (h = "");
	        }}

	    return s.join("") + h;
	};
	
	
	
function get_location(callback, on_err, on_location, params) {
	// if (isIPhone3_2_Plus())	{
	// 	//NOTE: starting in 3.2+, you'll need to set the applications
	// 	//purpose property for using Location services on iPhone


	if (Titanium.Geolocation.hasCompass) {
		Titanium.Geolocation.showCalibration = false;
		Titanium.Geolocation.headingFilter = 3;
	}

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	// Titanium.Geolocation.distanceFilter = 100;

	Titanium.Geolocation.purpose = "User location";
	// }

	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (e.error) {
			log('geo location error ' + JSON.stringify(e.error));
			on_err(e.error);
			return;
		}
		else if ( !!callback ) {
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			var timestamp = e.coords.timestamp;
			var accuracy = e.coords.accuracy;

			callback(latitude,longitude);
			log('rti geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);



			if ( !!on_location  && !Titanium.App.r_location_event_triggered ) {
				
				Titanium.Geolocation.addEventListener('location',function(e) {
					if (!e.success || e.error) {
						// alert('on_location error ' + JSON.stringify(e.error));	
						return;
					}

					var longitude = e.coords.longitude;
					var latitude = e.coords.latitude;
					var altitude = e.coords.altitude;
					var heading = e.coords.heading;
					var accuracy = e.coords.accuracy;
					var speed = e.coords.speed;
					var timestamp = e.coords.timestamp;
					var altitudeAccuracy = e.coords.altitudeAccuracy;

					Titanium.App.r_location_event_triggered =  true;
					log('geo - location event:' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);

					on_location(latitude,longitude);
					//Titanium.Geolocation.distanceFilter = 100; //changed after first location event
				})	
			}
		}
		else {
			// var longitude = e.coords.longitude;
			// var latitude = e.coords.latitude;
			// // var altitude = e.coords.altitude;
			// // var heading = e.coords.heading;
			// var accuracy = e.coords.accuracy;
			// // var speed = e.coords.speed;
			// var timestamp = e.coords.timestamp;
			// // var altitudeAccuracy = e.coords.altitudeAccuracy;
			// 
			// // log('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		}
	});
}	
	
	
	
	
	
	
function ownrgeocode(lat,lng,onok,onerr){
    var url="http://maps.google.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true";


    xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET',url);
    xhr.onload = function(){
	
	// log(this.responseText);
        var json = this.responseText;
		
        var gotitems = JSON.parse(json);
		// alert(gotitems.results[0]);
		onok(gotitems.results[0]);
        // log('>ADR found:'+ gotitems.results[0]);
        // adrlabel.text=gotitems.results[0].formatted_address;
 
    };
xhr.send(); 
}	



function mgDecodeHTMLEntities(str)
{
    //substitutes html numeric entities with the corresponding unicode character in one pass

     var currPos = 0;
    var d = str || '';
    
    var finalStr = '';
    while (true)
    {
        var start = d.indexOf('&#', currPos);
        if (start == -1)
            break;
        var end = d.indexOf(';', start);
        if (end == -1)
            break;
        var expr = d.substr(start + 2, end - start - 2);
        
        //handle hexadecimal values
        if (expr.substr(0, 1) == 'x')
        {
            expr = parseInt(expr.substr(1), 16);
        }
        else
        {
            expr = parseInt(expr,10);
        }
        
        if(expr >= -32768 && expr <= 65535)
        {
            expr = String.fromCharCode(expr);
        }
        else
        {
            expr = ''; 
        }

        finalStr = finalStr + d.substr(currPos, start - currPos) + expr;
        currPos = end + 1;
    }
    finalStr = finalStr + d.substr(currPos);
    return finalStr;
}


array_max = function( array ){
    return Math.max.apply( Math, array );
};
array_min = function( array ){
    return Math.min.apply( Math, array );
};

toQuery = function(obj) {
	if ( typeof obj == 'object' ) {
		var qs=[];
		for ( var k in obj ) {
			qs.push(k+"="+obj[k]);
		}
		return qs.join('&');
	}
	return obj;
}

