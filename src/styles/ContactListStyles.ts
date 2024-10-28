import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  sectionList: {
    marginTop: 20,
    width: 380,
  },
  sectionHeader: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#000',
  },
  contactItem: {
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 365,
    height: 130,
    margin: 'auto',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  contactPhoto: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  contactDetails: {
    flex: 1,
  },
  contactText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'ultralight',
  },
});

export default styles;
