import './style/main.scss';
import 'bootstrap';
import { App } from './ts/components/app';
import { state } from './ts/common/state';
import { DataController } from './ts/api/data-controller';

const init = async (): Promise<void> => {
  const categories = await DataController.getCategories();
  state.setCategories(categories);
  new App(document.body);
};

init();
