import Template from "App/Models/Template";
import altrpRandomId from "../../helpers/altrpRandomId";

export default async function renderCards(settings, device, context, id, { page, template: temp }) {
  const {posts_per_page, posts_card_template} = settings;
  const template = await Template.query().where('guid', posts_card_template).first();
  const cardHtml = template ? (await template.getChildrenContent(device, id, {})) : '';
  let cards = '';
  for (let i = 0; i < posts_per_page; i++) {
    cards += `<div>${cardHtml.replace(/}}}/g, `${context}_${i}}}}`)}</div>`;
  }

  return `<div class="altrp-cards">
      ${cards}
    </div>`;
}
