<?php
$commentsText = file_get_contents('log.txt');
$commentsList = json_decode($commentsText,true);

if(!empty($_POST['name']) && strlen($_POST['name']) > 3 ){
    $sComment = strip_tags($_POST['name']);

    $no = count($commentsList['log']) + 1;
    $commentsList['log'][] = array('name' => $sComment,'no' => $no,'date' => date('Y-m-d H:i:s'));

    $commentsText = json_encode($commentsList);

    file_put_contents('log.txt', $commentsText);
	
	echo $no;
}else{
	$commentsHTML = "<ul>";
	//var_dump($commentsList['log']);
	foreach( $commentsList['log'] as $commentItem ){
		$commentsHTML.= "<li>". $commentItem['no'] . " : ". $commentItem['name'] . " => " . $commentItem['date'] ."</li>";
	}
	$commentsHTML .= "</ul>";
	echo $commentsHTML;
}
?>