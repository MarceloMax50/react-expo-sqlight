import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './ui/Home/index';
import CadastroAtividade from './ui/CadastroAtividade/index';
import CadastroTipoAtividade from './ui/CadastroTipoAtividade/index';
const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadastroAtividade,
    CadastroTipoAtividade,
  })
);
export default function App() {
  return (
    <Routes />
  );
}
