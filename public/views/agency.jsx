var React = require('react');
var Helmet = require('react-helmet');

module.exports = React.createClass({
  render: function render() {
    return (
      <div>
        <Helmet
              title="Agency | the new blk"
              meta={[
                  {"name": "description", "content": "the new blk" }
              ]}
              link={[
                  {"rel": "canonical", "href": "http://thenewblk.com/"},
                  {"rel": "shortcut icon", "href": "/favicon.jpg"}
              ]}
          />
        <div className="agency_top">
          <div className="top_copy">
            <h3 className="subheader_top">THE NEW BLK IS AN AD AGENCY</h3>
            <h1 className="header_top">THAT BUILDS POWERFUL BRAND EXPERIENCES. </h1>
            <p className="header_copy">Founded in 2010 and headquartered in downtown Omaha, we work with local, regional, national and global brands. We are storytellers, brand builders, content marketers, strategic advisors, and message crafters. We work with traditional paid and earned media, but we also create our own media channels and leverage the power of social media to take the conversation direct to the audience.</p>
          </div>
          <img className="background_agency" src="/images/agency/theoldgirl_grayscale.jpg" />
          <div className="bottom_triangle white">
            <img className="icon" src="/icons/icon_agency-1.svg" />
          </div>
        </div>
      </div>
    );
  }
});
