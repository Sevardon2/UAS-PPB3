<?php

error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "";
$db = "api_note";

$koneksi = mysqli_connect($host,$user,$pass,$db);

$op = $_GET['op'];
switch($op){
    case '':normal();break;
    default:normal();break;
    case 'create':create();break;
    case 'detail':detail();break;
    case 'update':update();break;
    case 'delete':delete();break;
}

function normal(){
    global $koneksi;
    $sql1 = "select * from data order by id desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_dsn' => $r1['nama_dsn'],
            'nik' => $r1['nik']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create(){
    global $koneksi;
    $nama_dsn = $_POST['nama_dsn'];
    $nik = $_POST['nik'];
    $hasil = "Gagal dimasukkan data";
    if($nama_dsn and $nik){
        $sql1 = "insert into data(nama_dsn,nik) values ('$nama_dsn','$nik')";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "select * from data where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_dsn' => $r1['nama_dsn'],
            'nik' => $r1['nik']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id = $_GET['id'];
    $nama_dsn = $_POST['nama_dsn'];
    $nik = $_POST['nik'];
    if($nama_dsn){
        $set[] = "nama_dsn='$nama_dsn'";
    }
    if($nik){
        $set[] = "nik='$nik'";
    }
    $hasil = "Gagal melakukan update data";
    if($nama_dsn or $nik){
        $sql1 = "update data set ".implode(",",$set)." where id = '$id'";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "delete from data where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    if($q1){
        $hasil = "Berhasil menghapus data";
    }else{
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}
?>