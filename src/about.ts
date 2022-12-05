import { Header } from './header';
import { ViewSize } from './view-size';

(function startup() {
	ViewSize.init();
	Header.disableObserver();
	Header.init();
})();
