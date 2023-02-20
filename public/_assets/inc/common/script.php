<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<?php if(isset($isSlider) && $isSlider){ ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
<?php } ?>
<?php if(isset($isLightcase) && $isLightcase){ ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightcase/2.5.0/js/lightcase.min.js"></script>
<?php } ?>
<?php if(isset($isNiceScroll) && $isNiceScroll){ ?>
<script src="https://cdn.jsdelivr.net/npm/jquery.nicescroll@3.7.6/jquery.nicescroll.min.js"></script>
<?php } ?>
<?php if(isset($isModalvideo) && $isModalvideo){ ?>
<script src="https://cdn.jsdelivr.net/npm/modal-video@2.4.8/js/jquery-modal-video.min.js"></script>
<?php } ?>
<script src="<?php echo $SITE_ROOT; ?>_assets/js/common/script.js<?php
	if(strpos($_SERVER['HTTP_HOST'], $SITE_HOST) === false){
		echo '?' . time();
	}
?>"></script>
<?php if(isset($isInfiniteScroll) && $isInfiniteScroll){ ?>
<script src="https://unpkg.com/infinite-scroll@4/dist/infinite-scroll.pkgd.min.js"></script>
<script>
	const infiniteScroll = new InfiniteScroll('.js-infiniteScroll', {
		append: '.js-infiniteScroll_item',
		path: '.js-infiniteScroll_nav .next',
		hideNav: '.js-infiniteScroll_nav',
		button: '.js-infiniteScroll_more',
		status: '.js-infiniteScroll_status',
		scrollThreshold: 400,
		history: 'push',
	});
	infiniteScroll.on('append', function (response, path, items) {
		$('.c-list4_items').addClass('is-infiniteScroll_active');
	});
</script>
<?php } ?>
