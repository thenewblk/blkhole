var React = require('react');
var Helmet = require('react-helmet');

var util = require('util');
var Isvg = require('react-inlinesvg');

var Sprite = require('../components/sprite.jsx');

var services = [
  {
    id: 0,
    area: "branding",
    name: "ID",
    words: "We are often tasked with naming and branding new ventures, products, and services, sometimes even new categories altogether. As many of our clients are market disruptors, we spend a lot of time crafting new brands and developing the framework for families of brands. Naming, logo, and identity projects tend to be multifaceted, blending research and marketing strategy with very detailed conceptual work. Everything from trademark searches to procuring the right domain name can come into play. Creatively, there is always a storytelling component. We start with a visual mood board and segue into a brand lexicon and archetype profile, forming the foundation for a well-crafted narrative, which we call the “brand mantra.” Each step flows into the next. Logos are complex things, often with paradoxical imperatives. They need to clearly communicate a great deal, but do so quickly; be unique and ownable, but also familiar and relatable; feel contemporary and forward-thinking, but allow for evolution over time. These projects are always iterative, as we go from pencil sketches to black and white mockups to refined marks with color and type treatment options to brand style guides at the end. "
  },
  {
    id: 1,
    area: "branding",
    name: "Packaging",
    words: "Our senior creative team comes from a heavy consumer packaged goods background. Plus, we’re suckers for good packaging as much as the next person. So, packaging is near and dear to our hearts. With our clients competing on increasingly crowded shelves, we’re always looking at what will help their brands jump out, while still tying back to their overall brand stories. These projects extend beyond the exterior package to also include what’s inside the box as well as supporting materials at point-of-sale, which can often play a larger role in the purchase decision than the package itself. "
  },
  {
    id: 2,
    area: "branding",
    name: "Strategy",
    words: "When we’re hired as agency-of-record, a big part of what we do every day is provide strategic counsel, acting as a sounding board for new initiatives and having a key seat at the board room table when it comes to strategic planning. While this typically starts with marketing communications, these conversations have a way of dipping into a whole host of topics, from product development to sales to customer service. Even though we are perhaps better known for our creative chops, we have also been brought in for purely strategic assignments, in some cases helping turn around under-performing brands and other times assessing and assisting internal creative teams in their initiatives. "
  },
  {
    id: 3,
    area: "content",
    name: "Viral",
    words: "“Let’s make a video that goes viral” is a brilliant strategy that brings to mind the old Steve Martin bit about how to become a millionaire: “First, get a million dollars.” That said, there is a bag of tricks we can use to give our content the best opportunity to catch fire. It starts with a killer creative concept and a willingness to take some risks. But, it also includes a viral seeding strategy, getting our content in front of as many influential consumers as possible, the type of people who make a lot of noise online. At The New BLK, we handle the video production from concept to execution, as well as the marketing of that content through word-of-mouth, paid, and earned media. "
  },
  {
    id: 4,
    area: "content",
    name: "Narrative",
    words: "We love videos as a storytelling medium, for their immediacy, their visual impact, and the emotional connection they can forge with an audience. We’re not alone in this. Harvard Business Review did a fascinating study on the chemical reactions that happen in the brain, specifically the release of oxytocin, when watching a video and how that leads to an increased desire to help others, even to make charitable donations. Our in-house video production team tells stories in a variety of formats. Currently trending at The New BLK are unscripted episodic series, brand mantra scripted narrative videos, and fundraising videos for nonprofits. "
  },
  {
    id: 5,
    area: "content",
    name: "Broadcast",
    words: "No matter how much you hear about cord-cutting and the death of traditional broadcast media, TV and radio are thriving in this golden era of content. Likewise, TV and radio advertising play a vital role in many of our clients’ marketing campaigns. Working as a hybrid ad agency and production company, we produce award-winning 30s and 60s TV and radio spots very efficiently and effectively, keeping production values high and production costs low. Working with our outside media buyer partner, we get great reach with our spots and maximize exposure for our clients. "
  },
  {
    id: 6,
    area: "content",
    name: "Publishing",
    words: "When we talk about content, we’re often talking about video. But, not always. The Internet is still a great place for the written word and not all pictures have to be of the moving variety. To wit, we’ve worked hand in hand with clients to develop a more comprehensive online publishing platform–consulting on strategy, editorial direction, staffing, and logistics. All kinds of cool things have come into play in the publishing arena, from Instagram feeds to blogs, podcasts, and online forums and other community-building tools. We even helped one client launch a whole online magazine as a spinoff brand to support its entree into a new industry. "
  },
  {
    id: 7,
    area: "experiential",
    name: "Influencers",
    words: "A key ingredient to many a successful experiential campaign is convincing the cool kids to get behind it. You want the people who chatter the most to embrace what you’re doing, make it  their own, and keep the conversation going. It comes down to really understanding your core audience and then finding the right movers and shakers within that audience. We’ve worked alongside clients and other agencies to develop influencer outreach strategies and to execute them with the right boots on the ground. We have recruited and managed successful on-the-ground street teams for a number of clients, including Airbnb, Wells Blue Bunny, Ballot Hero, and UNO Athletics. "
  },
  {
    id: 8,
    area: "experiential",
    name: "Events",
    words: "We’ve produced over a hundred events, from mobile pop-ups to large-scale stadium crowds and a wide range in between. Sometimes, we are concepting, planning, and managing our own events for clients and other times we are connecting with existing events. We get involved from pre-event hype to in-event experience to post-event followup, understanding that every step along the way is a critical touchpoint where the audience intersects the brand. Seamless product integration, where the brand is adding value and not getting in the way, is a critical component in all cases. Too often event marketing ends when the event concludes. To us, for an event to be successful it has to have long enough legs to live on and segue organically into the next touchpoint. "
  },
  {
    id: 9,
    area: "experiential",
    name: "Promotions",
    words: "Every successful experiential campaign needs a great hook and oftentimes that means a promotional component that reads quickly, has an obvious appeal to the core audience, and speaks to the brand essence. This usually takes the form of a well-crafted game, contest, sweeps, or some combination of those elements. We typically work as a blended team with our clients’ internal departments as well as outside agencies and legal counsel to handle all of the detailed logistics of a promotional campaign.  "
  },
  {
    id: 10,
    area: "experiential",
    name: "Sponsorships",
    words: "Putting your name and logo on a sign at an event still has some value. But, to us, that’s barely scratching the surface of what a sponsorship can be. The best sponsorships feel more like true partnerships, when the sponsor brand and the event brand overlap in target audience, personality, voice, and core values. Sponsors today should get off the sidelines and into the game, should demand an opportunity to create a meaningful interaction with the audience. We’ve spent many years in the “co-marketing” trenches and love looking for opportunities to bring brands together, especially when it means bringing one of our clients together with another. We work closely with several event brands, including Maha Music Festival, to create unique, ownable brand experiences for their sponsors. "
  },
  {
    id: 11,
    area: "digital",
    name: "Social",
    words: "Social media today is in a similar spot to where web site development and digital advertising was in the late 90s and early 2000s. Every brand knows they need to get in on the action. We’ve gotten over that hump. But, there’s still a lot of grappling with overall strategy, the why behind what we’re doing. Without enough clear roadmaps or best practices, there’s a great deal of confusion about the how piece as well. We work with our clients to develop social media strategies tailored to their specific business objectives, technical requirements, and audience dynamics. Collaboration is a core value at The New BLK and there are few better examples of how that comes into play than social media. Whether we take the lead on managing your social properties or simply provide support and counsel, your social media initiative will necessitate a team effort, meaning a blended team of agency and client."
  },
  {
    id: 12,
    area: "digital",
    name: "Campaigns",
    words: "Every campaign we work on involves a major digital component. After all, it is 2016. Sometimes, the campaign is entirely digital, especially with clients that have a brand experience that takes place primarily online. In any scenario, our digital campaigns are a lot like offline campaigns in that they start with clear, measurable objectives and critical insights about your audience and dovetail into a dynamic creative concept that has enough legs to sustain an ongoing campaign. Our campaigns typically consist of a mix of SEO, SEM, display, rich media, sponsored content, pre-roll and in-programming advertising."
  },
  {
    id: 13,
    area: "digital",
    name: "Development",
    words: "Front-end user experience and development and back-end coding are part of The New BLK bag of tricks. Our team has worked on developing everything from large-scale enterprise e-commerce web sites to online communities to robust mobile apps. But, our chosen focus in the development arena is working on components that will increase the impact of a campaign, from engagement to conversion. That often means designing and building campaign microsites, but it can also mean developing specific tools and apps."
  },
  {
    id: 14,
    area: "digital",
    name: "Email",
    words: "Not nearly as sexy as whatever’s trending in social and mobile, email is still the workhorse of any self-respecting digital campaign. Some say email marketing is dead, killed off by spammers who went to the well one too many times. Um, they’re wrong. Pound for pound, email kicks everyone’s ass. We’ve seen it time and again, across a wide swath of industries. Well written, well designed emails, with a compelling reason to engage can be ridiculously effective at a relatively low cost. We work with clients to setup their email marketing operations, from list management to template design to editorial planning to back-end analytics. "
  },
  {
    id: 15,
    area: "digital",
    name: "Mobile",
    words: "Let’s face it, this is a broad category. When we talk about mobile, we’re talking about a lot of things. The first thing that comes to mind is responsive design, which means designing and building web sites so the user experience is great on a range of screen sizes, from desktop to tablet to smartphone. Numerous sources place mobile usage at over 60% of all web traffic. Google Analytics on our clients’ sites show similar numbers.  Our web design process typically starts with the question: how will this work on mobile? We talk to a lot of companies looking for mobile app development, but more often than not what they really need is an excellent mobile-friendly website. The mobile marketing mix also includes all the other ways you can interact with a brand through your phone – text alerts, geo-targeted promotional offers, and the various social apps such as Instagram, Twitter, Foursquare and Facebook, among others. As more and more of our time spent online continues to shift to the small screen of mobile, mobile marketing becomes less of a subgenre but rather the definitive digital experience."
  }
];

module.exports = React.createClass({
  getInitialState: function(){
    return {
      services: services,
      service: null
    }
  },
  skateboard: function(){
    alert("wrecked!")
  },
  openService: function(value){
    var self = this;
    var service = self.state.services.filter(function(thing){
      return thing.name == value;
    });

    self.setState({service: service[0]});

  },

  closeService: function(){
    this.setState({service: null});
  },

  render: function render() {
    var self = this;
    var service = self.state.service,
        services = self.state.services,
        branding = services.filter(function(service){
          return service.area == "branding";
        }).map(function(service){
          return (
            <p key={service.name} onClick={self.openService.bind(self,service.name)} className="service">{service.name}</p>
          )
        }),
        content = self.state.services.filter(function(service){
          return service.area == "content";
        }).map(function(service){
          return (
            <p key={service.name} onClick={self.openService.bind(self,service.name)} className="service">{service.name}</p>
          )
        }),
        experiential = self.state.services.filter(function(service){
          return service.area == "experiential";
        }).map(function(service){
          return (
            <p key={service.name} onClick={self.openService.bind(self,service.name)} className="service">{service.name}</p>
          )
        }),
        digital = self.state.services.filter(function(service){
          return service.area == "digital";
        }).map(function(service){
          return (
            <p key={service.name} onClick={self.openService.bind(self,service.name)} className="service">{service.name}</p>
          )
        });

    if (service){
      if (service.id < services.length ){
        var next_service = services[service.id + 1];
      }
      if (service.id > 0 ){
        var prev_service = services[service.id - 1];
      }
    }



    return (
      <div className="agency">
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
            <h1 className="subheader_top">WE BUILD POWERFUL EXPERIENCES</h1>
          </div>
          <div className="theoldgirl">
            <div className="block">
              <span className="left_label bold">Story</span>
              <span className="content">Founded in 2010 and headquartered in downtown Omaha, we work with local, regional, national and global brands. We are storytellers, brand builders, content marketers, strategic advisors, and message crafters. We work with traditional paid and earned media, but we also create our own media channels and leverage the power of social media to take the conversation direct to the audience.</span>
            </div>
          </div>
        </div>
        <div className="needle">
          <h1 className="needle_headline" onClick={this.skateboard}>MOVE THE NEEDLE</h1>
          <div className="block">
            <span className="left_label"></span>
            <span className="content">
              <p>The origin of this phrase goes back to analog audio devices and polygraph machines. The needle moves when whatever you’re doing is loud or impactful enough to cause a reaction. Interestingly, the phrase itself triggers its share of reactions. Forbes, for one, singled it out as one of the most annoying examples of business jargon. Can’t say we’d argue with that. And yet, we say it. And, chances are, you say it too. So, let’s say it now.</p>
              <div className="home_sprite">
                <Sprite
                  image="/icons/agency/fontenelle.svg"
                  columns={13}
                  frames={13}
                  duration={.5}
                  frameW={125}
                  frameH={225}
                  hover={true} />
              </div>
              <div className="home_sprite">
                <Sprite
                  image="/icons/agency/maha.svg"
                  columns={11}
                  frames={22}
                  duration={.5}
                  frameW={250}
                  frameH={250}
                  hover={true} />
              </div>
              <div className="home_sprite">
                <Sprite
                  image="/icons/agency/uno.svg"
                  columns={9}
                  frames={18}
                  duration={.5}
                  frameW={300}
                  frameH={200}
                  hover={true} />
              </div>
            </span>
          </div>
        </div>
        <div className="services">
          <div className="block">
            <span className="left_label bold">Services</span>
            <span className="content">As an agency that builds powerful brand experiences, our work extends to a wide range of touchpoints, encompassing traditional and nontraditional, digital, and analog media. We approach each challenge from what we call “the swarm” – a full-on immersion in your brand, with a multidisciplinary team coming at it from a variety of angles. No matter what the task at hand is, we always keep an eye on the big picture, fitting the needs of the individual project into the overall context of how your brand intersects with your audience. <br />Our four core, overlapping service areas are:</span>
          </div>
          { service ?

              <div className="service_detail open">
                <div className="service_detail_wrapper">
                  <span className="close" onClick={self.closeService}><Isvg src="/icons/new/close-01.svg" /></span>
                  <div className="top_detail">
                    <div className="left">
                      <p className="area bold">Services <span className="diamond"></span> {service.area}</p>
                      <h1 className="name uppercase">{service.name}</h1>
                    </div>
                    <div className="right">
                      <p className="words">{service.words}</p>
                    </div>
                  </div>
                  <div className="bottom_detail">
                    { next_service ? <span className="next_service here" onClick={self.openService.bind(self,next_service.name)}><span className="service_name bold">{next_service.name}</span> <Isvg src="/icons/new/right-01.svg" /></span> : <span className="next_service"><Isvg src="/icons/new/right-01.svg" /></span> }
                    { prev_service ? <span className="prev_service here" onClick={self.openService.bind(self,prev_service.name)}><Isvg src="/icons/new/left-01.svg" /> <span className="service_name bold">{prev_service.name}</span></span> : <span className="prev_service"><Isvg src="/icons/new/left-01.svg" /></span> }
                  </div>
                </div>
              </div>
              :
                <div className="service_detail">
                  <div className="service_detail_wrapper">
                    <span className="close"><Isvg src="/icons/new/close-01.svg" /></span>
                  </div>
                </div>
            }
          <div className="block service_list">
            <div className="service_type">
              <h2 className="service_title">Branding</h2>
              {branding}
            </div>
            <div className="service_type">
              <h2 className="service_title">Content</h2>
              {content}
            </div>
            <div className="service_type">
              <h2 className="service_title">Experiential</h2>
              {experiential}
            </div>
            <div className="service_type">
              <h2 className="service_title">Digital</h2>
              {digital}
            </div>
          </div>
        </div>

        <img className="full" src="/images/agency/millenial_Conny.jpg" />

        <div className="clients">

          <div className="block">
            <span className="left_label bold">Clients</span>
            <span className="content">
              <p className="uppercase italic">OUR CLIENTS TEND TO STAND </p>
              <h3 className="bold">FOR SOMETHING BIGGER.</h3>
            </span>
          </div>
          <div className="block">
            <span className="left_label"></span>
            <span className="content">No matter what they’re selling, it’s about bucking conventional wisdom, disrupting the status quo, solving old problems in new ways to get better results. We work heavily in industries that fit the lifestyle of our core Millennial and Generation X audience: arts & entertainment, sports, technology, food & beverage, fashion, higher education, and cause marketing. But, finding the right fit goes beyond industry and even audience. More than anything, it’s cultural.</span>
          </div>

        </div>

        <img className="full" src="/images/agency/millenial_woman.jpg" />

        <div className="audience">

          <div className="block">
            <span className="left_label bold">Audience</span>
            <span className="content">
              <h3 className="bold">OUR PRIMARY AUDIENCE IS MILLENNIALS, WITH HEAVY CROSSOVER INTO GENERATION X.</h3>
            </span>
          </div>
          <div className="block">
            <span className="left_label"></span>
            <span className="content">
              <p>These are social connectors, community builders, technologists, entrepreneurs, young professionals, activists, and do-it-yourselfers. They are the tastemakers and trendsetters that can make or break your brand.</p>
              <p>While certainly not one-dimensional, there are some common threads that run throughout this group. Connecting with this audience takes a great deal of finesse and often poses a serious challenge to traditional marketers. The old play book just doesn’t work and going about it the wrong way can actually cause irreparable damage to your brand.</p>
              <p>It’s not just about speaking the right language, although that’s part of it. You have to be so fully immersed in this world to pass as a native. That’s why The New BLK gets hired by big, global brands to connect with this audience.</p>
              <p className="uppercase italic">WE LIVE IT.</p>
            </span>
          </div>

        </div>
      </div>
    );
  }
});
