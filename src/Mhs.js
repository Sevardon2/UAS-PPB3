import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Title, Card } from 'react-native-paper';

import { style } from '../Style';

class Mhs extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nama_mhs:'',
        nim:'',
        jurusan:'',
        listData:[],
        idEdit:null,
    };
    this.url = "http://192.168.43.34/api/apinote2.php";
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
      if(this.state.nama_mhs == '' || this.state.nim == '' || this.state.jurusan == ''){
        alert('Silakan masukkan Nama, NIM dan Jurusan');
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
              body:"nama_mhs="+this.state.nama_mhs+"&nim="+this.state.nim+"&jurusan="+this.state.jurusan
          })
          .then((response)=>response.json())
          .then((json)=>{
              this.setState({nama_mhs:''});
              this.setState({nim:''});
              this.setState({jurusan:''});
              this.ambilListData();
          })
      }
  }
  async klikEdit(id){
    await fetch(this.url+"/?op=detail&id="+id)
    .then((response)=>response.json())
    .then((json)=>{
        this.setState({nama_mhs:json.data.result[0].nama_mhs});
        this.setState({nim:json.data.result[0].nim})
        this.setState({jurusan:json.data.result[0].jurusan})
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
                        <Text style={style.textListNama}>{val.nama_mhs}</Text>
                        <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>Edit</Text>
                        <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                    </View>
                    <Text style={{padding:5}}>{val.nim}</Text>
                    </Card>
                ))
            }
        </View>
        </Card>
        <View style={style.viewForm}>
            <TextInput 
                style={style.textInput}
                placeholder="Nama"
                value={this.state.nama_mhs}
                onChangeText={(text)=>this.setState({nama_mhs:text})}
                >
            </TextInput>
            <TextInput
                multiline={true}
                style={style.textInput}  
                placeholder="NIM" 
                value={this.state.nim}
                onChangeText={(text)=>this.setState({nim:text})} 
            ></TextInput>
            <TextInput
                multiline={true}
                style={style.textInput}  
                placeholder="Jurusan" 
                value={this.state.jurusan}
                onChangeText={(text)=>this.setState({jurusan:text})} 
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

export default Mhs;