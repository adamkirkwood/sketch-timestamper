import moment from 'moment'
import { traveler as TimeTraveler } from 'discrete-time'

export default function (context) {
  const sketch = context.api()

  const { selectedLayers } = sketch.selectedDocument

  const settings = {
    starts_at: moment().format(),
    steps: selectedLayers.length,
    time_units: "seconds",
    time_scale: Math.floor((Math.random() * 1000) + 1)
  }

  const traveler = new TimeTraveler(settings)

  selectedLayers
    .iterateWithFilter("isText", (layer) => {
      layer.text = traveler.current.time.fromNow()
      traveler.step_backward()
    })
}
