import service from "./service";

class InfoService {
  infoServiceUrl = "/info";

  contactUs = async (payload: ContactUsPayload) => {
    const response = await service.post(this.infoServiceUrl + "/contact-us", payload);
    return response.data;
  };
}

export default InfoService;
