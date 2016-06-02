$(function() {
	var $accordionGroups;
	var $answers;
	var $bodyHtml;
	var $nav;
	var $questions;
	var $resultsText;
	var $titles;
	var headerBarHeight;

	function init() {
		initSelectors();
		addClassNames();
		initSearch();
		initScroll();
	}

	function initSelectors() {
		$nav = $('.myNavBar');
		$bodyHtml = $('body,html');
		headerBarHeight = $nav.height() + 50;

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
				}
			});

			// $questions.each(function(index, value) {
			// 	var text = $(this).text().toLowerCase();
			// 	var resultsFound = text.indexOf(input) > -1;
			// 	if (resultsFound) {
			// 		resultsCount++;
			// 		var $result = $(this).closest('.accordion-group');
			// 		var classNames = $result.attr('class').toString().split(' ');
			// 		var headerName = classNames.pop().split('--').pop();
			// 		var $header = $('.' + headerName + '__header');
			// 		$header.show();
			// 		$result.show();
			// 	}
			// });

			// $answers.each(function(index, value) {
			// 	var text = $(this).text().toLowerCase();
			// 	var resultsFound = text.indexOf(input) > -1;
			// 	if (resultsFound) {
			// 		resultsCount++;
			// 		var $result = $(this).closest('.accordion-group');
			// 		var classNames = $result.attr('class').toString().split(' ');
			// 		var headerName = classNames.pop().split('--').pop();
			// 		var $header = $('.' + headerName + '__header');
			// 		$header.show();
			// 		$result.show();
			// 	} 		
			// });

			if (resultsCount > 0) {
				var result = (resultsCount > 1) ? 'results' : 'result';
			  	$resultsText.html('<p>Showing ' + resultsCount + ' ' + result + ' for ' + '"' +input+ '"');
			} else {
			  	$resultsText.html('<p>No results found</p>');
			}	
		});		
	}



	   // //Get list of CSS class names
    //     var classNames = $("#myDiv").attr("class").toString().split(' ');
    //     $.each(classNames, function (i, className) {
    //         alert(className);
    //     });

	// $('.search-criteria').on('keyup', function() {  
	//   var $value = $(this).val().toLowerCase(),
	//   	  $allAccordions = $('.accordion-group').hide(),
	//       $allTextAreas = $('.accordion-group .textArea p'),
	//   // var $allTitles = $('.parbase.textArea.section h2').hide();
	// 	  $allTitles = $('.contentParsys').children('.textArea').hide();
	 
	//   $allTextAreas.each(function(i) {
	//     var $text = $(this).text().toLowerCase(),
	//     	$currentIndex = $text.indexOf($value),
	//     	$answer = $(this).closest('.accordion-group');
	       	
	//  		$('.accordion-group').each(function(index, elm) {
	// 	   		if ($(elm).is(":visible")) {
	// 	   			$(".parsys.contentParsys > .textArea:eq(" + (index - 1) + ")").show();
	// 	   		}
	// 	   	});

	//     if ($currentIndex > -1) {
	//       $answer.show();
	//     } else {
	//       $answer.hide();
	//     }
	  
	// 	if($value !== ""){
	// 	  	$('.resultsText').html('<p>Showing ' + $('.accordion-group:visible').length + ' result(s) for ' + $value);
	// 	} else {
	// 	  	$('.resultsText').html('');
	// 	}
	// });
	// });

	function scrollToAnchor(target) {
	    var aTag = $("a[name='"+ target +"']")
	    $('html,body').animate({
	    	scrollTop: aTag.offset().top - headerBarHeight
	    },'slow');
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
	    $("nav select").change(function() {
		  window.location = $(this).find("option:selected").val();
		});
	}


	init();
});	
