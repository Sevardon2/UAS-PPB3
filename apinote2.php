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
    $sql1 = "select * from data_mhs order by id desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_mhs' => $r1['nama_mhs'],
            'nim' => $r1['nim'],
            'jurusan' => $r1['jurusan']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create(){
    global $koneksi;
    $nama_mhs = $_POST['nama_mhs'];
    $nim = $_POST['nim'];
    $jurusan = $_POST['jurusan'];
    $hasil = "Gagal dimasukkan data";
    if($nama_mhs and $nim and $jurusan){
        $sql1 = "insert into data_mhs(nama_mhs,nim,jurusan) values ('$nama_mhs','$nim','$jurusan')";
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
    $sql1 = "select * from data_mhs where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'nama_mhs' => $r1['nama_mhs'],
            'nim' => $r1['nim'],
            'jurusan' => $r1['jurusan']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id = $_GET['id'];
    $nama_mhs = $_POST['nama_mhs'];
    $nim = $_POST['nim'];
    $jurusan = $_POST['jurusan'];
    if($nama_mhs){
        $set[] = "nama_mhs='$nama_mhs'";
    }
    if($nim){
        $set[] = "nim='$nim'";
    }
    if($jurusan){
        $set[] = "jurusan='$jurusan'";
    }
    $hasil = "Gagal melakukan update data";
    if($nama_mhs or $nim or $jurusan){
        $sql1 = "update data_mhs set ".implode(",",$set)." where id = '$id'";
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
    $sql1 = "delete from data_mhs where id = '$id'";
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