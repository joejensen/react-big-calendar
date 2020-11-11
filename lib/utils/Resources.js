'use strict'

exports.__esModule = true
exports.default = Resources
exports.NONE = void 0
var NONE = {}
exports.NONE = NONE

function Resources(resources, accessors) {
  return {
    map: function map(fn) {
      if (!resources) return [fn([NONE, null], 0)]
      return resources.map(function(resource, idx) {
        return fn([accessors.resourceId(resource), resource], idx)
      })
    },
    groupEvents: function groupEvents(events) {
      // console.log("groupEvents",events);
      var eventsByResource = new Map()

      if (!resources) {
        // console.log("no resources");
        // Return all events if resources are not provided
        eventsByResource.set(NONE, events)
        return eventsByResource
      }

      events.forEach(function(event) {
        var id = accessors.resource(event) || NONE //split up if it is an array

        if (Array.isArray(id)) {
          id.forEach(function(item) {
            var resourceEvents = eventsByResource.get(item) || []
            resourceEvents.push(event)
            eventsByResource.set(item, resourceEvents)
          })
        } else {
          var resourceEvents = eventsByResource.get(id) || []
          resourceEvents.push(event)
          eventsByResource.set(id, resourceEvents)
        }
      }) // console.log("eventsByResource", eventsByResource);

      return eventsByResource
    },
  }
}
