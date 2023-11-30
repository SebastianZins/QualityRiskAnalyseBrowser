# QualityRiskAnalyseBrowser

Recreation of the application that was part of my bachelor thesis from 2023.

The Goal was to achieve a simple solution to visualize a batch in a production chain with measurements which are not neccesarily off-spec but show some level of abnormailty.

For this i calculated a "quality risk score" ranging from 1 to 5, where 5 is off-spec and 1 to 4 are progressively more abnormal measurements. 
This metric takes in consideration the relative distance from the median of the reference measurement distribution, the deviation of it, and the distant to the respective upper or lower threshhold.
This metric is by no means complete and should only signify the potential of the application:
Showing batches which potentially could have had a negetive influence on the following batches.

For this the screen is basically devide into main components. Each having a aggregation of the lower levels by taking the worst-case score value of the level below it. 
The most high level view, is a tree graph, visualizing not only the different steps the production chain for a specified material consists of 
(so beginning at the end product, all materials and process orders which were involved in the production of this material, down to the raw material level),
but also the worse measurement of each nodes measurement lots measurements.
The nodes represent the different kinds of nodes in a production chain. For simplification I only considered raw materials (as the leaf nodes), process orders (as interior nodes) and end products as (root nodes).
(Idealy the direction of "back to front" and "front to back", so tracking and tracing, should be selectable, but for now only the direction "front to back", so starting from the end product, is implemented.)

By selecting a node in view, the next selection one level down is possible. In this level one can select one of the measurement lots corersponding to the selected tree node. Here the worse case measuremt of the corresponding measurments is displayed.
By selecting that, a selection of the measurements becomes visible, showing the name of the measurement together with the calculated quality risk index (color coded).

Selecting on of those two visuals appoear, both contextualizing the selected measurement from the data of the previouse step with the referential measurement data, in a time series chart (left) and a histogram chart (right).


With this it should be possible to trace a quality deviation in the end product back to a faulty raw material or an error in a production step.
Making the analysis thorugh differen layers not only visually appealing, but also easy to understand and learn to use. There are no special skills neccesary to use this app. Most of the skills needed, should be relatively commen to similar data presentations 
on other mobile and web applications or should be easily figured out by "playing around" in the application.

Since this is app is just the product of my bachelor thesis, it is by no way anything I would call a "finished product". There is still much that could be improved appon.
For example:
  - Creating a more satisfying User Interaction through the Animation of the hiding and reindruducing of subtrees or tree brachnes in the first level visualization, 
    the integration of tooltips or quickinfos in all of the charts
  - a better comunication between the visual cards
  - better computation of values (here just sample values, calculated on the fly)


Notic! The presented values, IDs and other data are just sample data. Most of it was hard coded as a basis for the showcase of this application and the rest is generated algorythmically. There is no live connection or real data used in this application sample!
    
