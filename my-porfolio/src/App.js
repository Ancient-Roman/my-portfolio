import PageHeader from './components/PageHeader';
import ImageSection from './components/ImageSection';
import MainResume from './components/MainResume';


function App() {
  
  return (
    <div className="App relative overflow-x-hidden max-w-full">

      <PageHeader/>
      <ImageSection/>

      <MainResume/>

    </div>
  );
}

export default App;