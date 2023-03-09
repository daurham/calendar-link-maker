<script>
  import { Meteor } from "meteor/meteor";
  import { lookup } from "zipcode-to-timezone";
  import * as QS from "qs";
  import moment from "moment";
  // import momentTz from "moment-timezone";
  import { DateTime } from "luxon";

  let googleLink,
    outlookLink,
    timezone,
    zipcode = "90210",  
    // zipcode = "11355",
    // zipcode = "85086",
    startTimestamp,
    startTSG,
    startTSO,
    endTimestamp,
    endTSG,
    endTSO,
    sd,
    st,
    ed,
    et;

  const convertToTimestampS = () => {
    // startTimestamp = new Date(Date.parse(`${sd}T${st}`));
    startTimestamp = DateTime.fromJSDate(new Date(Date.parse(`${sd}T${st}`)));
    startTimestamp = startTimestamp.setZone(timezone).toISO();
    startTSG = startTimestamp; // google
    startTSO = startTimestamp.slice(0, -10) + startTimestamp.slice(-6, startTimestamp.length + 1); // outlook
  };
  const convertToTimestampE = () => {
    endTimestamp = DateTime.fromJSDate(new Date(Date.parse(`${ed}T${et}`)));
    endTimestamp = endTimestamp.setZone(timezone).toISO();
    endTSG = endTimestamp; // google
    console.log(endTimestamp); 
    endTSO = endTimestamp.slice(0, -10) + endTimestamp.slice(-6, endTimestamp.length + 1); // outlook
    console.log(endTSO);
  };

  $: timezone = lookup(zipcode);

  $: {
    if ((startTimestamp, endTimestamp)) {

      googleLink = `https://calendar.google.com/calendar/render?${QS.stringify({
        action: "TEMPLATE",
        dates:
          startTSG.replace(/([-:.])/g, "") +
          "/" +
          endTSG.replace(/([-:.])/g, ""),
        details: "description",
        location: "location",
        text: "summary",
        timeZone: timezone,
      })}`;

      // 2023-03-08T23:15:00+00:00
      // startTSO = startTSO.slice(0, startTSO.lastIndexOf("-")) + "+" + startTSO.slice(startTSO.lastIndexOf("-") + 1, startTSO.length);
      // startTSO = startTSO.slice(0, -5) + "00:00"
      console.log(startTSO);
      // endTSO = endTSO.slice(0, endTSO.lastIndexOf("-")) + "+" + endTSO.slice(endTSO.lastIndexOf("-") + 1, endTSO.length);
      // endTSO = endTSO.slice(0, -5) + "00:00"
      console.log(endTSO);
      outlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?${QS.stringify(
        {
          body: "description",
          startdt: startTSO.replace(/([.])/g, ""),
          location: "location",
          path: "/calendar/action/compose",
          rru: "addevent",
          enddt: endTSO.replace(/([.])/g, ""),
          subject: "summary",
          allday: false,
          timeZone: timezone,
        }
      )}`;
    }
  }
  const tempoutlooklink = "https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2023-03-08T13%3A03%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-03-08T12%3A02%3A00%2B00%3A00";
  console.log(QS.parse("https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2023-03-08T23%3A45%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-03-08T23%3A15%3A00%2B00%3A00"));
  console.log(QS.parse(tempoutlooklink));
</script>

<div class="container">
  <h1>Welcome to Meteor!</h1>
  <br />
  <label for="zip">Zipcode:</label>
  <input type="text" id="zip" placeholder="zipcode" bind:value={zipcode} />
  <br />

  <label for="date">Select a date:</label>
  <input type="date" id="date" bind:value={sd} />
  <br />

  <label for="time">Select a time:</label>
  <input type="time" id="time" bind:value={st} />
  <br />
  <button on:click={convertToTimestampS}>Convert to Timestamp</button>
  <br />
  <br />
  <br />
  <label for="date">Select a date:</label>
  <input type="date" id="date" bind:value={ed} />
  <br />

  <label for="time">Select a time:</label>
  <input type="time" id="time" bind:value={et} />
  <br />
  <button on:click={convertToTimestampE}>Convert to Timestamp</button>

  <br />
  <br />
  <br />
  Google:
  {#if googleLink}
    <a target="_blank" rel="noreferrer" href={googleLink}>{googleLink}</a>
    {googleLink}
  {/if}
  <br />
  <br />
  Outlook:
  {#if outlookLink}
    <a target="_blank" rel="noreferrer" href={outlookLink}>{outlookLink}</a>
    {outlookLink}
    {/if}
    <br />
    <br />
    Example:
    {"https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2023-03-08T23%3A45%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-03-08T23%3A15%3A00%2B00%3A00"}
    {"https://outlook.live.com/calendar/0/deeplink/compose?allday=false&enddt=2023-03-08T23%3A45%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-03-08T23%3A15%3A00%2B00%3A00"}
</div>
