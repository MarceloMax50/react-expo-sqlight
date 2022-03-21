import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  areaCad: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  areaCadType: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 150
  },
  area: {
    width: '45%',
  },
  areaEdit: {
    height: 50,
    backgroundColor: '#292929',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'white'
  },
  subCad: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  areaBtnHome: {
    marginBottom: 10,
    height: 70,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  areaBtnActivity: {
    marginTop: 70,
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  areaBtnType: {
    marginTop: -80,
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#66a5f2',
    borderRadius: 10,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 1
  },
  listContact: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  contact: {
    backgroundColor: '#292929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  listName: {
    width: '40%',
    fontSize: 18,
    paddingRight: 10,
    color: '#fff',
  },
  listStatus: {
    width: '60%',
    fontSize: 18,
    paddingRight: 10,
    color: '#fff',
  },
  dataListPhone: {
    width: '35%',
    flexDirection: 'row',
  },
  email: {
    width: '50%',
    flexDirection: 'row',
  },
  btnAction: {
    width: '10%',
  },
  iconPhone: {
    width: 20,
    height: 25,
    marginRight: 5,
  },
  listPhone: {
    color: "#FFF",
    fontSize: 18,
  },
  titleContact: {
    fontSize: 25,
    color: '#FFF',
    backgroundColor: '#66a5f2',
    width: '100%',
    textAlign: 'center'
  },
  listTypes: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    marginBottom: '50%'
  },
  listTypes: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    marginBottom: '50%'
  },
  dataListTypes: {
    width: '70%',
    flexDirection: 'row',
  },
  picker: {
    borderColor: '#fff',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  cadActivity: {
    backgroundColor: '#292929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
});

export default styles;