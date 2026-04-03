import React from "react";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import ListInput from "../ui/ListInput";
import DimensionIntro from "../ui/DimensionIntro";

// Helper component for CV Progress Banner
function CVProgressBanner({
  n,
  total,
  fields,
  pct
}) {
  return (
    <div className="cv-banner">
      <span className="cv-banner-icon">📄</span>
      <div className="cv-banner-body">
        <div className="cv-banner-title">
          CV Auto-fill · {n}/{total} indicators
        </div>
        <div className="cv-banner-desc">{fields}</div>
        <div className="cv-bar">
          <div
            className="cv-bar-fill"
            style={{
              width: pct + "%"
            }}
          />
        </div>
      </div>
      <div className="cv-banner-pct">
        {pct}%
      </div>
    </div>
  );
}

// Helper component for Card Section
function CardSection({
  num,
  title,
  sub,
  color,
  open,
  children
}) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);

  return (
    <div className={`card${isOpen ? " card-open" : ""}`}>
      <div className="card-hdr" onClick={() => setIsOpen(!isOpen)}>
        <div className="card-hdr-l">
          <div
            className="card-num"
            style={{
              background: color || "#7c3aed"
            }}
          >
            {num}
          </div>
          <div>
            <div className="card-ttl">{title}</div>
            {sub && <div className="card-sub">{sub}</div>}
          </div>
        </div>
        <span className="chevron">▾</span>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default function P4Intellectual({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🔬 Part 4</div>
      <h1 className="sec-title">Intellectual Impact</h1>
      <p className="sec-desc">
        Research production, regional publications, chairs, and public events.
      </p>

      <CVProgressBanner
        n={16}
        total={22}
        fields="Publications, citations, expertise, PhD supervision"
        pct={72}
      />

      <CardSection num="4.1" title="National & International Production" open={true}>
        <DimensionIntro
          label="Research data"
          types="faculty CVs, PURE exports, research lists, or annual reports"
        />
        <div className="fr3">
          <TextInput
            indicator="4.1.1"
            label="PhD defences"
            value={data.phdDefences}
            onChange={(e) => setField("phdDefences", e)}
          />
          <TextInput
            indicator="4.1.2"
            label="Academic journal articles"
            value={data.journalArticles}
            onChange={(e) => setField("journalArticles", e)}
          />
          <TextInput
            indicator="4.1.3"
            label="Professional articles"
            value={data.profArticles}
            onChange={(e) => setField("profArticles", e)}
          />
        </div>
        <div className="fr3">
          <TextInput
            indicator="4.1.4"
            label="Books authored"
            value={data.books}
            onChange={(e) => setField("books", e)}
          />
          <TextInput
            indicator="4.1.5"
            label="Co-authored books"
            value={data.coBooks}
            onChange={(e) => setField("coBooks", e)}
          />
          <TextInput
            indicator="4.1.6"
            label="Book chapters"
            value={data.chapters}
            onChange={(e) => setField("chapters", e)}
          />
        </div>
        <div className="fr3">
          <TextInput
            indicator="4.1.7"
            label="Conference papers"
            value={data.confPapers}
            onChange={(e) => setField("confPapers", e)}
          />
          <TextInput
            indicator="4.1.8"
            label="Published cases"
            value={data.cases}
            onChange={(e) => setField("cases", e)}
          />
          <TextInput
            indicator="4.1.9"
            label="Conferences organised"
            value={data.confsOrg}
            onChange={(e) => setField("confsOrg", e)}
          />
        </div>
        <TextArea
          indicator="4.1.10"
          label="How research productivity is measured"
          value={data.resProdMethod}
          onChange={(e) => setField("resProdMethod", e)}
        />
        <TextArea
          indicator="4.1.11"
          label="How research impact is measured"
          value={data.resImpactMethod}
          onChange={(e) => setField("resImpactMethod", e)}
        />
        <ListInput
          indicator="4.1.12"
          label="Fields of nationally recognised expertise"
          items={data.natExpertise ?? [""]}
          onChange={(e) => setField("natExpertise", e)}
        />
        <ListInput
          indicator="4.1.13"
          label="Fields of internationally recognised expertise"
          items={data.intlExpertise ?? [""]}
          onChange={(e) => setField("intlExpertise", e)}
        />
        <TextArea
          indicator="4.1.14"
          label="Link between research expertise and UN SDGs"
          value={data.resSDGLink}
          onChange={(e) => setField("resSDGLink", e)}
        />
      </CardSection>

      <CardSection num="4.2" title="Regional Publications & Communications">
        <ListInput
          indicator="4.2.1"
          label="PhDs on topics concerning the region"
          items={data.regPhds ?? [""]}
          onChange={(e) => setField("regPhds", e)}
        />
        <ListInput
          indicator="4.2.2"
          label="Academic articles concerning the region"
          items={data.regArticles ?? [""]}
          onChange={(e) => setField("regArticles", e)}
        />
        <ListInput
          indicator="4.2.3"
          label="Books/chapters concerning the region"
          items={data.regBooks ?? [""]}
          onChange={(e) => setField("regBooks", e)}
        />
        <ListInput
          indicator="4.2.4"
          label="Research partnerships with regional orgs"
          items={data.regPartnerships ?? [""]}
          onChange={(e) => setField("regPartnerships", e)}
        />
        <TextArea
          indicator="4.2.5"
          label="Consulting reports for regional companies / authorities"
          value={data.regConsulting}
          onChange={(e) => setField("regConsulting", e)}
        />
      </CardSection>

      <CardSection num="4.3" title="Chairs and Research Partnerships">
        <ListInput
          indicator="4.3.1"
          label="Chairs linked to the impact zone"
          items={data.chairs ?? [""]}
          onChange={(e) => setField("chairs", e)}
          placeholder="Chair name — sponsor…"
        />
        <ListInput
          indicator="4.3.2"
          label="Research partnerships with regional organisations"
          items={data.resPartners ?? [""]}
          onChange={(e) => setField("resPartners", e)}
        />
      </CardSection>

      <CardSection num="4.4" title="Public Lectures and Events">
        <ListInput
          indicator="4.4.1"
          label="Public events and lectures (past 12 months)"
          items={data.pubEvents ?? [""]}
          onChange={(e) => setField("pubEvents", e)}
          placeholder="Event name — date — attendance"
        />
      </CardSection>

      <CardSection num="4.5" title="Research Impact on Teaching">
        <TextArea
          indicator="4.5.1"
          label="Influence on programme design and course content"
          value={data.resTeachInfluence}
          onChange={(e) => setField("resTeachInfluence", e)}
        />
        <TextArea
          indicator="4.5.2"
          label="Coherent link: research agenda ↔ programme offer ↔ regional environment"
          value={data.resTeachLink}
          onChange={(e) => setField("resTeachLink", e)}
        />
      </CardSection>
    </div>
  );
}
