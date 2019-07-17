export default {
    isJsiUnit (unit) {
        if (unit.params && typeof unit.params === 'object' || unit.units && Array.isArray(unit.units)) {
            return true;
        }

        return false;
    }
};