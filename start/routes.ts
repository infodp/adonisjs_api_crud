//import PhonesController from "#controllers/phones_controller";
const PhonesController = () => import('#controllers/phones_controller')
import router from "@adonisjs/core/services/router";

router.get('phones', [PhonesController, 'index'])
router.get('phones/:id', [PhonesController, 'show'])
router.post('phones', [PhonesController, 'store'])
router.put('phones/:id', [PhonesController, 'update'])
router.delete('phones/:id', [PhonesController, 'destroy'])
