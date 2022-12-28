import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { style } from '../Style';

class Isi extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nama_dsn:'',
        nik:'',
        listData:[],
        idEdit:null,
    };
    this.url = "http://192.168.43.34/api/apinote.php";
  }
  componentDidMount(){
      this.ambilListData()
  }
  async ambilListData(){
    await fetch(this.url)
    .then((response)=>response.json())
    .then((json)=>{
        console.log('Hasil yang didapat: '+JSON.stringify(json.data.result));
        this.setState({listData:json.data.result});
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  klikSimpan(){
      if(this.state.nama_dsn == '' || this.state.nik == ''){
        alert('Silakan masukkan Nama dan NIK');
      }else{
          if(this.state.idEdit){
            var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
          }else{
            var urlAksi = this.url+"/?op=create";
          }
          

          fetch(urlAksi,{
              method:'post',
              headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
              },
              body:"nama_dsn="+this.state.nama_dsn+"&nik="+this.state.nik
          })
          .then((response)=>response.json())
          .then((json)=>{
              this.setState({nama_dsn:''});
              this.setState({nik:''});
              this.ambilListData();
          })
      }
  }
  async klikEdit(id){
    await fetch(this.url+"/?op=detail&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        this.setState({nama_dsn:json.data.result[0].nama_dsn});
        this.setState({nik:json.data.result[0].nik})
        this.setState({idEdit:id})
    })
  }
  async klikDelete(id){
    await fetch(this.url+"/?op=delete&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        alert('Data berhasil dihapus');
        this.ambilListData();
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  render() {
    return (
      <View style={style.viewWrapper}>
        <Card style={style.viewData}>
            <View style={style.viewData}>
                {
                    this.state.listData.map((val,index)=>(
                        <Card style={{margin:5}}>
                        <View style={style.viewList} key={index}>
                            <Text style={style.textListNama}>{val.nama_dsn}</Text>
                            <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>Edit</Text>
                            <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                        </View>
                        <Text style={{padding:5}}>{val.nik}</Text>
                        </Card>
                    ))
                }
            </View>
        </Card>
        <View style={style.viewForm}>
            <TextInput 
                style={style.textInput}
                placeholder="Nama"
                value={this.state.nama_dsn}
                onChangeText={(text)=>this.setState({nama_dsn:text})}
                >
            </TextInput>
            <TextInput
                multiline={true}
                placeholder="NIK"
                style={style.textInput}   
                value={this.state.nik}
                onChangeText={(text)=>this.setState({nik:text})} 
            ></TextInput>
            <Button 
            title="Masukkan Data"
            onPress={()=>this.klikSimpan()}>

            </Button>
        </View>
      </View>
    );
  }
}

export default Isi;