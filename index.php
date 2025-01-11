<?php
    require_once('data/version.inc.php');
?>
<html lang="en-us">
<head>
    <title>Koan's Archive</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <link rel="stylesheet" href="css/archive.css?v=<?=VERSION?>">
    <link rel="stylesheet" href="css/models.css?v=<?=VERSION?>">
    <link rel="stylesheet" href="css/viewer.css?v=<?=VERSION?>">
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
    <script type="text/javascript" src="js/utilities.js?v=<?=VERSION?>"></script>
    <script type="text/javascript" src="js/history.js?v=<?=VERSION?>"></script>
    <script type="text/javascript" src="js/component.js?v=<?=VERSION?>"></script>
    <script type="text/javascript" src="js/models.js?v=<?=VERSION?>"></script>
    <script type="text/javascript" src="js/archive.js?v=<?=VERSION?>"></script>
    <script type="text/javascript">
        // For debugging
        var _archive;
        window.onload = function() {
            let archive = new Archive();
            archive.register();
            archive.load();
            _archive = archive;
        };
    </script>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V3DL87V391"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-V3DL87V391');
    </script>
</head>
<body>
    <div class="tabContainer" id="mainContainer">
        <div class="tab" id="models">
        </div>
    </div>

    <div id="loading">
        &nbsp;
    </div>
</body>
</html>
