// ./app/curriculum/curriculum.service.js

var curriculum = angular.module('curriculumService', []);

curriculum.service('curriculumService', ['$http', '$q',
	function($http, $q) {
		// Markedjs to render markdown to html
		var renderer = new marked.Renderer();

		marked.setOptions({
			renderer: renderer
		});

		// Customize table rendered to add bootstrap class="table"
		renderer.table = function (header, body) {
			return '<table class="table">\n'
			+ '<thead>\n'
			+ header
			+ '</thead>\n'
			+ '<tbody>\n'
			+ body
			+ '</tbody>\n'
			+ '</table>\n';
		};

		// Highlightjs for syntax highlighting
		renderer.code = function(code, language) {
			return '<pre class="hljs ' + language + '"><code>' +
				hljs.highlight(language, code).value +
				'</code></pre>';
		};

		// Use JQuery to add nested id tags to headers
		var addIDs = function($content) {
			var slugs = ['', '', ''];
			$content.find('h1, h2, h3, h4').each(function() {
				var $el = $(this);
				var num = parseInt(this.nodeName[1]);
				var text = $el.text();
				var slug = text.toLowerCase().replace(/[^\w]+/g, '-');

				if (num > 1) slug = slugs[num - 2] + '-' + slug;
				slugs.length = num - 1;
				slugs = slugs.concat([slug, slug]);
				$el.attr('id', slug);
			});
			return $content
		};

		var getMenu = function($content) {
			var root = {items: [], id: '', level: 0};
			var cache = [root];

			function mkdir_p(level) {
				cache.length = level + 1;
				var obj = cache[level];
				if (!obj) {
					var parent = (level > 1) ? mkdir_p(level-1) : root;
					obj = { items: [], level: level };
					cache = cache.concat([obj, obj]);
					parent.items.push(obj);
				}
				return obj;
			}

			$content.find('h1, h2, h3').each(function() {
				var $el = $(this);
				var level = +(this.nodeName.substr(1));

				var parent = mkdir_p(level-1);

				var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
				parent.items.push(obj);
				cache[level] = obj;
			});

			return root;
		};

		var MenuView = function(menu, href, clickBind) {
			var $el = $("<ul>");

			function process(node, $parent) {
			  var id = node.id || 'root';

			  var $li = $('<li>')
				.attr('id', id + '-item')
				.addClass('level-' + node.level)
				.appendTo($parent);

			  if (node.section) {
				var $a = $('<a>')
				  .html(node.section)
				  .attr('id', id + '-link')
				  .attr('href', '#/' + href +'#' + node.id)
				  .attr('ng-click', clickBind + '(\''+ node.id + '\')')
				  .addClass('level-' + node.level)
				  .appendTo($li);
			  }

			  if (node.items.length > 0) {
				var $ul = $('<ul>')
				  .addClass('level-' + (node.level+1))
				  .attr('id', id + '-list')
				  .appendTo($li);

				node.items.forEach(function(item) {
				  process(item, $ul);
				});
			  }
			}
			process(menu, $el);
			return $el;
		};

		this.getHtmlfromMd = function(docDir, href, clickBind, mdDocs) {
			var bigDoc = '';
			var getDocs = [];

			angular.forEach(mdDocs, function(doc) {
				getDocs.push($http.get(docDir + doc + '.md').then(function(resp) {
					return resp.data;
				}));
			});
		
			var prom = $q.all(getDocs).then(function(data) {
				for (i in data) {
					bigDoc += data[i];
					var mdContent = marked(bigDoc);
					var mdHtml = $("<div>" + mdContent);
					var mdHtmlIds = addIDs(mdHtml);
					var menu = getMenu(mdHtmlIds);
					var menuHtml = MenuView(menu, href, clickBind)
				}

				return [mdHtmlIds.html(), menuHtml.html()];
			});

			return prom;
		}
	}
]);
