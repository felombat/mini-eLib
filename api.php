<?Php 

$temp = [];

if( isset($_GET['folder']) ){
    $folder = $_GET['folder']; 
    foreach(glob("./$folder/*.{pdf,epub}",  GLOB_BRACE) as $file) {
        $temp[] = $file;
    }
}else{
    foreach(glob("./new/ISO-Certification/*.{pdf,epub}",  GLOB_BRACE) as $file) {
        $temp[] = $file;
    }
}


$json = json_encode($temp);
header("Content-type:application/json");
header('Access-Control-Allow-Origin:*');
echo $json  ; 

?>