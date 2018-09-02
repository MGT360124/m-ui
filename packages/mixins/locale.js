import { t } from 'main/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
