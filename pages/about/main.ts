import { Header } from "../../src/header";
import { ViewSize } from "../../src/view-size";

(function startup() {
	ViewSize.init();
	Header.disableObserver();
	Header.init();
	Header.detachEventsListener();
})();
