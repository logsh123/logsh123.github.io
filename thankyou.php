<?php
// Область с настройками
$pp = ''; // Код партнёрки, в которую будет отправлена заявка (если настроен с ней поток).
$apikey = ''; // Ваш апи-ключ. Брать из раздела: https://arbalet.wildo.ru/dash/api
$debugmode = 0; // Режим дебага (показывает ответ сейвера сверху страницы), 1 - вкл, 0 - выкл, по ум 0

// Технические настройки
$savefile = 1; // Сохранять копи лидов в файл на вашем сервере?, 1 - вкл, 0 - выкл, по ум. 1
$display_error = 0; // Показывать ли ошибки php на странице? по ум. 0

// Настройки страницы благодарности
$th_title = ""; // Заголовок страницы благодарности, вместо {name} подставит имя пользователя, к примреу: Спасибо, {name}. Не удалять, а то будет ошибкаы
$th_desc = ""; // Описание страницы благодарности, не удалять, а то будет ошибка

// Настройки пикселя
//Скрипты пикселя вставлять именно сюда. Можно вставлять сколько угодно пикселей и метрик. Все они будут либо в <head> либо в <body>. Скрипт в head будет загружаться до загрузки визуальной страницы, скрипт в body после. Скрипт вставляем ВМЕСТО <script>console.log('ok')</script>. Это для примера
$user_pixel = <<<PIXEL
<script>console.log('ok')</script>
PIXEL;
$User_pixel_position = 1; // 1 - В body, 0 - в head, по ум. 1

// Дальше идёт техническая сторона, её изменение, либо удаление несёт критический характер и крайне не рекомендуется для полноценной работы сейвера.
// Показывает ошибки
if ($display_error) {
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
}

// Отправка лида на апи
$hash = isset($_POST['site_hash']) ? $_POST['site_hash'] : 'Ошибка хэша';
$url = "https://cpa79.info/lead/$hash/";

$data = [
    'api_key' => $apikey,
    'name' => isset($_POST['name']) ? $_POST['name'] : 'Не указано',
    'phone' => isset($_POST['phone']) ? $_POST['phone'] : 'Не указан',
    'pp' => isset($_POST['pp']) ? $_POST['pp'] : $pp,
    'ip' => $_SERVER['REMOTE_ADDR'],
    'useragent' => $_SERVER['HTTP_USER_AGENT'],
    'subid1' => isset($_POST['subid1']) ? $_POST['subid1'] : '',
    'subid2' => isset($_POST['subid2']) ? $_POST['subid2'] : '',
    'subid3' => isset($_POST['subid3']) ? $_POST['subid3'] : '',
    'subid4' => isset($_POST['subid4']) ? $_POST['subid4'] : '',
    'subid5' => isset($_POST['subid5']) ? $_POST['subid5'] : '',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);

// Ответ от сервера
if (empty($result) and $debugmode) {
    echo 'Ошибка отправки';
} else if ($debugmode) {
    echo $result;
}

// Сохранение в файл
$filename = 'lead79s117.txt'; // Прижелании можно поменять на любое другое, чтобы задать файл в папке - прописывается "/папка/файл.txt"

// Магическая запись, не менять
$set_date = date('Y-m-d H:i:s'); // Просто текущая дата
$magic_str = "[$set_date] Имя: {$data['name']} | Телефон: {$data['phone']} | IP: {$data['ip']}\n";
file_put_contents($filename, $magic_str, FILE_APPEND | LOCK_EX);

$th_title = str_replace("{name}", $data['name'], $th_title);
?>

<!-- Страница благодарности -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Спасибо за заявку, test!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <?php if (!$User_pixel_position) { echo $user_pixel; } ?>
</head>

<body style="margin:0; padding: 0;">
<div class="container-fluid" style="background: #C9D6FF;  background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  background: linear-gradient(to right, #E2E2E2, #C9D6FF); background-size:cover;  height:100%; min-height: 100vh; display:flex; justify-content: center; align-items:center;">
	<div>
		<div class="container">
			<div class="row">
				<div class="col-12 text-center" style="max-width: 480px;">
                    <div style="color:#222; font-size:30px; display: flex; justify-content: center; align-items: center; margin-bottom: .5em; text-align: center;">
                        <?php echo !empty($th_title) ? $th_title : "Спасибо за заявку, {$data['name']}"; ?>
                    </div>
                    <div style="color:#222; font-size:20px; font-weight: 100; display: flex; justify-content: center; align-items: center; text-align: center;">
                        <?php echo !empty($th_desc) ? $th_desc : "Мы свяжемся с Вами в ближайшее время для уточнения подробностей доставки."; ?>
                    </div>

				</div>
			</div>
		</div>
	</div>
</div>

<?php if ($User_pixel_position) { echo $user_pixel; } ?>
</body>
</html>