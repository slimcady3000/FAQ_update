$(function() {
	var $accordionGroups,
		$answers,
		$bodyHtml,
		$nav,
		$navSelect,
		$questions,
		$resultsText,
		$titles, 
		headerBarHeight;

	function init() {
		initSelectors();
		addClassNames();
		initSearch();
		initScroll();
		$("input[type=submit]").attr('disabled','disabled');
		$('.accordion-toggle').click(function () {

		  $(this).find('.accordion-icon').toggleClass('arrow-rotate');

		});
	}

	function addClassNames() {
		$titles.each(function(index, value) {
			var $label = $(this).find('h2');
			var text = $label.text().toLowerCase();
			$label.addClass(text + '__header__label');
			
			var $header = $(this);
			$header.addClass(text + '__header');

			var $accordionContainer = $header.next();
			$accordionContainer.addClass(text + '__accordion-container');
			$accordionContainer.each(function(index, value) {
				var $group = $(this).find('.accordion-group');
				$group.addClass('accordion-group--' + text);

				var $question = $(this).find('a');
				$question.addClass('faq-question--' + text);

				var $answer = $(this).find('.textArea p');
				$answer.addClass('faq-answer--' + text);
			});
		});
	}

	function initSelectors() {
		$nav = $('.myNavBar');
		$navSelect = $('.myNavBar select');
		$bodyHtml = $('body,html');
		headerBarHeight = $nav.height();
		
		$accordionGroups = $('.accordion-group');
		
		$questions = $('.accordion-group').find('.accordion-toggle');
		$questions.addClass('faq-question');
		$questions = $('.faq-question');

		$answers = $('.accordion-group .textArea p');
		$answers.addClass('faq-answer');
		$answers = $('.faq-answer');

		$titles = $('.contentParsys').children('.textArea');

		$resultsText = $('.resultsText');
	}

	function hideAll() {
		$titles.hide();
		$accordionGroups.hide();
	}

	function initSearch() {
		$('.search-criteria').on('keyup', function() {
			var input = $(this).val().toLowerCase();
			var input = $.trim(input);
			var empty = input.length == 0;
			var resultsCount = 0;

			if (empty) {
				$resultsText.html('');
				$('.faqs__header').show();
				$('.faqs__accordion-container').show();
				return;
			}

			hideAll();
			
			$accordionGroups.each(function(index, value) {
				var question = $(this).find('.faq-question').text().toLowerCase();
				var questionFound = question.indexOf(input) > -1;
				var answer = $(this).find('.faq-answer').text().toLowerCase();
				var answerFound = answer.indexOf(input) > -1;
				var resultFound = questionFound || answerFound;
				if (resultFound) {
					var $result = $(this);
					var classNames = $result.attr('class').toString().split(' ');
					var headerName = classNames.pop().split('--').pop();
					var $header = $('.' + headerName + '__header');
					$header.show();
					$result.show();
					resultsCount++;
					$('.faqs__header').hide();
					$('.faqs__accordion-container').hide();
				} 
			});

			if (resultsCount > 0) {
				var result = (resultsCount > 1) ? 'results' : 'result';
			  	$resultsText.html('<p>Showing ' + resultsCount + ' ' + result + ' for ' + '"' +input+ '"');
			} else {
			  	$resultsText.html('<p>No results found</p>');
			}
		});	
	}

	function scrollToAnchor(target) {
	    var aTag = $("a[name='"+ target +"']")
	    if ($('body').scrollTop() == 0){
		    $('html,body').animate({
		    	scrollTop: aTag.offset().top - headerBarHeight - 125
		    },'slow');
		} else {
			$('html,body').animate({
		    	scrollTop: aTag.offset().top - 125
		    },'slow');
		}
	}

	function initScroll() {
		$(window).scroll(function() {
		    if ($(this).scrollTop() > 230){  
		        $nav.animate().addClass("sticky");
		    }
		    else{
		        $nav.removeClass("sticky");
		    }
		});

		$nav.on('click', 'a', function(e) {
	        var $navLink = $(this).attr('href');
			scrollToAnchor($navLink);
	        e.preventDefault();
	    });
	    $navSelect.change(function(e) {
		  var $navLink = $(this).find("option:selected").val();
		  scrollToAnchor($navLink);
	      e.preventDefault();
		});
	}


	init();
});	
