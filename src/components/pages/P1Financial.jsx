import React from "react";
import Section from "../ui/Section";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";

/**
 * P1Financial page - financial and economic impact
 */
export default function P1Financial({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">💰 Part 1</div>
      <h1 className="sec-title">Financial Impact</h1>
      <p className="sec-desc">
        Direct and indirect economic contributions to the impact zone.
      </p>

      {/* Section 1.1: Budget — Direct Impact */}
      <Section
        number="1.1"
        title="Budget — Direct Impact"
        open={true}
      >
        <div className="fr2">
          <TextInput
            indicator="1.1.1"
            label="Total annual budget"
            prefix="€"
            value={data.totalBudget}
            onChange={e => setField("totalBudget", e)}
          />
          <TextInput
            indicator="1.1.2"
            label="% spent in impact zone"
            suffix="%"
            value={data.budgetZonePct}
            onChange={e => setField("budgetZonePct", e)}
          />
        </div>

        <div className="fr2">
          <TextInput
            indicator="1.1.3"
            label="Foundation budget"
            prefix="€"
            value={data.foundationBudget}
            onChange={e => setField("foundationBudget", e)}
          />
          <TextInput
            indicator="1.1.4"
            label="Junior enterprise budget"
            prefix="€"
            value={data.jeBudget}
            onChange={e => setField("jeBudget", e)}
          />
        </div>

        <div className="fr2">
          <TextInput
            indicator="1.1.5"
            label="Student association budgets"
            prefix="€"
            value={data.assocBudget}
            onChange={e => setField("assocBudget", e)}
          />
          <TextInput
            indicator="1.1.6"
            label="Local alumni budget"
            prefix="€"
            value={data.alumniBudget}
            onChange={e => setField("alumniBudget", e)}
          />
        </div>

        <TextInput
          indicator="1.1.7"
          label="Ad hoc / special project budgets"
          prefix="€"
          value={data.adhocBudget}
          onChange={e => setField("adhocBudget", e)}
        />

        <TextArea
          indicator="1.1.8"
          label="Methodology & reference period"
          value={data.budgetMethod}
          onChange={e => setField("budgetMethod", e)}
        />
      </Section>

      {/* Section 1.2: Expenditures — Indirect Impact */}
      <Section
        number="1.2"
        title="Expenditures — Indirect Impact"
      >
        <div className="fr2">
          <TextInput
            indicator="1.2.1"
            label="Student expenditures in zone"
            prefix="€"
            value={data.studentExp}
            onChange={e => setField("studentExp", e)}
          />
          <TextInput
            indicator="1.2.2"
            label="Visiting scholar / researcher expenditures"
            prefix="€"
            value={data.visitProfExp}
            onChange={e => setField("visitProfExp", e)}
          />
        </div>

        <div className="fr2">
          <TextInput
            indicator="1.2.3"
            label="Conference & event expenditures"
            prefix="€"
            value={data.confExp}
            onChange={e => setField("confExp", e)}
          />
          <TextInput
            indicator="1.2.4"
            label="Executive education participant expenditures"
            prefix="€"
            value={data.execEdExp}
            onChange={e => setField("execEdExp", e)}
          />
        </div>

        <div className="fr2">
          <TextInput
            indicator="1.2.5"
            label="Family / relative expenditures"
            prefix="€"
            value={data.familyExp}
            onChange={e => setField("familyExp", e)}
          />
          <TextInput
            indicator="1.2.6"
            label="Interviewee honorariums & travel"
            prefix="€"
            value={data.intervieweeExp}
            onChange={e => setField("intervieweeExp", e)}
          />
        </div>

        <TextArea
          indicator="1.2.7"
          label="Methodology & reference period"
          value={data.expMethod}
          onChange={e => setField("expMethod", e)}
        />
      </Section>
    </div>
  );
}
