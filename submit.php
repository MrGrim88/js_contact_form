<?php
$params = [];
$keys   = ['to','from','website','facility_id','name','email','phone','subject','msg'];
$ret    = [];
foreach ($keys as $k) {
    $params[$k] = strip_tags ( $_GET[$k] );
}
if ($params['to'] != '' && $params['from'] != '') {
    $params = http_build_query($params);
    $ret = file_get_contents('https://www.endpoint.com/mail/send?' . $params);
}
echo $ret;
