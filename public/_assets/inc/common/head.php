<?php
	$SITE_NAME = (isset($isEnglish) && $isEnglish) ? 'NIPPON CINEMA RETRO KYOTO' : 'ニッポン シネマレトロ キョウト';
	$SITE_HOST = 'cinema-retro.kyoto';
	$SITE_URI = (empty($_SERVER['HTTPS']) ? 'http' : 'https') . '://' . $_SERVER['HTTP_HOST'];
	$SITE_REQUEST = $SITE_URI . $_SERVER['REQUEST_URI'];
?>

<!-- <meta name="robots" content="noindex,nofollow"> -->

<!-- Google Tag Manager -->
<script>
	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({
			'gtm.start': new Date().getTime(),
			event: 'gtm.js'
		});
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src =
			'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-NRHSNMJ');
</script>
<!-- End Google Tag Manager -->

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no,address=no,email=no">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0">
<link rel="icon" href="<?php echo $SITE_ROOT; ?>_assets/img/common/favicon.ico">
<link rel="apple-touch-icon" href="<?php echo $SITE_ROOT; ?>_assets/img/common/apple-touch-icon.png">
<link rel="icon" type="image/png" href="<?php echo $SITE_ROOT; ?>_assets/img/common/android-chrome.png">
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>">
<?php if(isset($keywords) && $keywords){ ?>
<meta name="keywords" content="<?php echo $keywords; ?>">
<?php }?>
<meta property="og:locale" content="<?php
	echo (isset($isEnglish) && $isEnglish) ? 'en_US' : 'ja_JP';
?>">
<meta property="og:site_name" content="<?php echo $SITE_NAME; ?>">
<meta property="og:image" content="<?php
	if(isset($metaImage) && $metaImage){
		echo $SITE_URI . $metaImage;
	}else{
		echo $SITE_URI . $SITE_ROOT . '_assets/img/common/ogp.png';
	}
?>">
<meta property="og:type" content="<?php if(isset($isHome) && $isHome){
		echo 'website';
	}else{
		echo 'article';
}?>">
<meta property="og:title" content="<?php echo $title; ?>">
<meta property="og:description" content="<?php echo $description; ?>">
<meta property="og:url" content="<?php echo $SITE_REQUEST; ?>">
<link rel="canonical" href="<?php echo $SITE_REQUEST; ?>">
<link rel="alternate" hreflang="<?php
	echo (isset($isEnglish) && $isEnglish) ? 'en' : 'ja';
?>" href="<?php echo $SITE_REQUEST; ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@200;300;400;600;700;800;900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/hannari.css">
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css">
<?php if(isset($isSlider) && $isSlider){ ?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css">
<?php } ?>
<?php if(isset($isLightcase) && $isLightcase){ ?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightcase/2.5.0/css/lightcase.min.css">
<?php } ?>
<?php if(isset($isModalvideo) && $isModalvideo){ ?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modal-video@2.4.8/css/modal-video.min.css">
<?php } ?>
<link rel="stylesheet" href="<?php echo $SITE_ROOT; ?>_assets/css/style<?php
	if($_SERVER['HTTP_HOST'] === $SITE_HOST){
		echo '.min';
	}
?>.css<?php
	if($_SERVER['HTTP_HOST'] !== $SITE_HOST){
		echo '?' . time();
	}
?>">
