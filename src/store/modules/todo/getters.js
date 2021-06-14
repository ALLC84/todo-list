import { fetchFromObject } from "@/utils/helpers/object";

export default {
  state: (state) => (field) => fetchFromObject(state, field)
};
