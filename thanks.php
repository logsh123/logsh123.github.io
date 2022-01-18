<?php

	# Возможные значения $useOwn:
	# 0 - дизайн страницы будет стандартным (при этом страница все равно будет размещена на вашем домене).
	# 1 - вы можете использовать свой дизайн, вставив код в конец документа. По умолчанию - пустой экран.

	$useOwn = 0;

	# Возможные значения $saveLeads:
	# 0 - лиды будут отправляться только в Арбалет
	# 1 - лиды будут отправляться в Арбалет и сохраняться у Вас на сервере в txt-файл "leads.txt". Рекомендуем запретить доступ к этому файлу из браузера для избежания доступа посторонних лиц.

	$saveLeads = 0;

	if($saveLeads) file_put_contents("leads.txt", implode(";", $_REQUEST).";".$_SERVER['HTTP_USER_AGENT'].";".$_SERVER['HTTP_REFERER']."\r\n", FILE_APPEND | LOCK_EX); $curl = curl_init("https://cpa78.info/lead/7b8bdf14ebabcfef802b6fe0441b1b27?ownIP=".getIP()); curl_setopt($curl, CURLOPT_TIMEOUT, 30); curl_setopt($curl, CURLOPT_POSTFIELDS, $_REQUEST); curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); curl_setopt($curl, CURLOPT_REFERER, $_SERVER['HTTP_REFERER']); if($useOwn) curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); $result = curl_exec($curl); function getIP(){ if (!isset($_SERVER)) return null; if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) foreach(explode(', ', $_SERVER['HTTP_X_FORWARDED_FOR']) as $ip) if(filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) { $_SERVER['REMOTE_ADDR'] = $ip; return $ip; } if (isset($_SERVER['HTTP_X_REAL_IP']) && filter_var($_SERVER['HTTP_X_REAL_IP'], FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_REAL_IP']; return $_SERVER['HTTP_X_REAL_IP']; } return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null; }

?>
