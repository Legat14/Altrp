import {useEffect, useRef, useState} from "react";
import replaceContentWithData from '../../../../../../front-app/src/js/functions/replaceContentWithData';


function AccordionItem({idArray, idx, open, item, title_html_tag_accordion_content, icon, activeIcon, activeMode, data}) {

  const [accordionHeight, setAccordionHeight] = useState("0px")
  const content = useRef(null)

  const onAccordion = (e) => {
    setAccordionHeight(accordionHeight === "0px" ? content.current.scrollHeight + "px" : "0px")
    open(e);
  }

  useEffect(() => {
    if (activeMode) {
      setAccordionHeight(accordionHeight)
    } else {
      setAccordionHeight("0px")
    }
  }, [activeMode])

  let title_repeater = item.title_repeater || ''
  if(title_repeater){
    title_repeater = replaceContentWithData(title_repeater, data)
  }
  let wysiwyg_repeater = item.wysiwyg_repeater || ''
  if(wysiwyg_repeater){
    wysiwyg_repeater = replaceContentWithData(wysiwyg_repeater, data)
  }
  return (

    <div className={"altrp-accordion-item" + (idArray[idx] ? ' active' : '')}>
      {/*button*/}
      <div className="altrp-accordion-item-button" data-key={idx} onClick={(e) => onAccordion(e)}>
        <div className="altrp-accordion-item-label-container">
          {
            React.createElement(
              title_html_tag_accordion_content,
              {
                className: "altrp-accordion-item-label"
              },
              [title_repeater]
            )
          }
        </div>
        {/*icon*/}
        <div className="altrp-accordion-item-icon">
          {idArray[idx] ? activeIcon : icon}
        </div>
      </div>
      {/*content*/}
      <div ref={content} style={{maxHeight: `${accordionHeight}`}} className="altrp-accordion-item-content"
           data-item={idx}>
        <div className="altrp-accordion-item-content-text" dangerouslySetInnerHTML={{__html: wysiwyg_repeater}}/>
      </div>
    </div>

  );
}

export default AccordionItem;
