angular
  .module('sticky', [])
  .directive('sticky', function($window) {
    return {
      link: function(scope, element, attrs) {

        var $win = angular.element($window);
        var isStuck = false;
        var startPosition = element.offset().top;
        var placeholder = angular.element('<div></div>');

        $win.bind('scroll.sticky', function(e) {
          var currentPosition = $win.scrollTop();

          if (!isStuck && currentPosition > startPosition) {
            element.css({position: 'fixed', top: 0});
            isStuck = true;
            placeholder.css({height: element.outerHeight(true) + 'px'})
              .insertBefore(element);
          } else if (isStuck && currentPosition < startPosition) {
            element.css({position: '', top: ''});
            isStuck = false;
            placeholder.remove();
          }
        });

        function resetPosition() {
          if (!isStuck) {
            startPosition = element.offset().top;
          } else {
            startPosition = placeholder.offset().top;
          }
        };

        $win.bind('load', resetPosition);
        $win.bind('resize', resetPosition);
      }
    };
  });
