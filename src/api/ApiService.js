import { reactive } from 'vue';
import {getPatientId} from "@/api/getPatientId.js";

class ApiService {
  constructor() {
    this.state = reactive({
      patientId: getPatientId(),
      data: {},
      isLoading: false,
      error: null,
    });
  }

  async fetchData() {
    this.state.isLoading = true;
    this.state.error = null;

    try {
      const response = await fetch(`https://tulahackdays.dev-ittest.ru/api/patient/${this.state.patientId}`);
      const data = await response.json();
      this.state.data = data.data;
    } catch (error) {
      this.state.error = error;
    } finally {
      this.state.isLoading = false;
    }
  }

  clearData() {
    this.state.data = null;
    this.state.error = null;
  }
}

export const apiService = new ApiService();
