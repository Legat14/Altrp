import Template from "App/Models/Template";

export default async function renderCards(
  settings,
  device,
  context,
  id,
  { page, template: temp }
) {
  const {
    posts_per_page,
    posts_card_template,
    posts_columns,
    posts_rows_distance,
    prev_text,
    next_text,
    posts_pagination_type,
    hide_pre_page_button,
    hide_next_page_button,
  } = settings;
  const template = await Template.query()
    .where("guid", posts_card_template)
    .first();
  const cardHtml = template
    ? await template.getChildrenContent(device, id, {})
    : "";
  const rowGap = `${posts_rows_distance.size}${posts_rows_distance.unit}`;

  let cards = "";
  for (let i = 0; i < posts_per_page; i++) {
    cards += `<div class="altrp-post">${cardHtml.replace(
      /}}}/g,
      `${context}_${i}}}}`
    )}</div>`;
  }

  const prevButton = `<button
            class="altrp-pagination__previous state-disabled"
            disabled
          >
            <span>${prev_text || ""}</span>
          </button>`;

  const nextButton = `<button
            class="altrp-pagination__next"
          >
            <span>${next_text || ""}</span>
          </button>`;

  const pagination = `<div class="altrp-pagination-pages">
          ${!hide_pre_page_button ? prevButton : ""}
          ${!hide_next_page_button ? nextButton : ""}
        </div>`;

  return `<div class="altrp-cards" style="display: grid; grid-template-columns: repeat(${posts_columns}, 1fr); grid-row-gap: ${rowGap}">
            ${cards}
          </div>
          ${pagination}`;
}
