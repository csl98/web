<?php

	$con = mysql_connect('localhost', 'root', '45683968');//连接库
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('meile', $con);


	if (@$_POST["cart"] && @$_POST["user_id"]) {//添加商品

		$user_id = $_POST["user_id"];
		$newcart = json_decode($_POST['cart']);

		$result = mysql_query("SELECT * FROM users");

		while ($row = mysql_fetch_array($result)) {
			if ($row['user_id'] === $user_id) {//找到目标cart

				$cart = json_decode($row['carts']);//push
				array_push($cart, $newcart);
				$cart = json_encode(json_encode($cart));

				break;
			}
		}

		if (mysql_query("UPDATE users
			SET carts = $cart
			WHERE user_id = $user_id")) {//修改
			echo 1;
		} else {
			echo 0;
		}

	} else if (@$_GET['cart']) {//输出carts

		$user_id = $_GET['cart'];

		$result = mysql_query("SELECT carts FROM users WHERE user_id = $user_id");
		$carts = mysql_fetch_array($result)[0];

		echo $carts;

	} else if (@$_POST["remove"] && @$_POST['user_id']) {//删除商品

		$arr = json_decode($_POST["remove"]);
		$user_id = $_POST['user_id'];
		$result = mysql_query("SELECT carts FROM users WHERE user_id = $user_id");
		$carts = json_decode(mysql_fetch_array($result)[0]);

		for($i=0;$i<count($arr);$i++){
			array_splice($carts, $arr[$i], 1);
		}

		$carts = json_encode(json_encode($carts));//json_encode($carts,JSON_UNESCAPED_UNICODE)

		if (mysql_query("UPDATE users
			SET carts = $carts
			WHERE user_id = $user_id")) {//修改
			echo 1;
		} else {
			echo 0;
		}


	} else if (@$_POST["register"]) {//注册

		$newuser = json_decode($_POST["register"]);
		$bool = false;


		$result = mysql_query("SELECT * FROM users");

		while ($row = mysql_fetch_array($result)) {//查询是否存在
			if ($row['user_name'] === $newuser[0]) {
				echo 2;
				$bool = true;
				break;
			}
		}

		if (!$bool) {//添加用户
			
			$id = mysql_num_rows($result)+1;
			$username = json_encode($newuser[0]);
			$password = json_encode($newuser[1]);
			$carts = json_encode('[]');

			$sql = "INSERT INTO users
			(user_id, user_name, password, carts)
			VALUES
			($id, $username, $password, $carts)";

		
			if (mysql_query($sql, $con)) {
				echo 1;//成功
			} else {
				var_dump($sql);
			}

		}


	} else if (@$_POST['login']) {//登录

		$bool = false;
		$login = json_decode($_POST['login']);

		$result = mysql_query('SELECT * FROM users');
		while ($row = mysql_fetch_array($result)) {
			if ($row['user_name'] === $login[0]) {
				$bool = true;

				if ($row['password'] === $login[1]) {
					echo $row['user_id'];//登陆成功
				} else {
					echo '密码错误';//密码错误
				}
				break;
			}
		}

		if (!$bool) {
			echo '用户不存在';//用户不存在
		}

	}
	
	mysql_close($con);//关闭连接

?>