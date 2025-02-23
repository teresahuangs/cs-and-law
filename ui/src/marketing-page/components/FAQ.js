import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
    );
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="span" variant="subtitle2">
              How do I contact customer support if I have a question or issue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              You can reach our customer support team by emailing&nbsp;
              <Link href="mailto:support@email.com">support@email.com</Link>
              &nbsp;or calling our toll-free number. We&apos;re here to assist you
              promptly.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="span" variant="subtitle2">
              What should I do to file a claim after I find out my work is copyrighted?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  <li>Gather evidence to support your claim. This includes copies of the infringing work, your original work, registration certificates (if applicable), and any other relevant documentation.</li>
                  <li>Try to settle the issue first, as courts expect you to contact the person or company directly. You can:
                    <ul>
                      <li>Send a cease-and-desist letter asking them to stop using your work.</li>
                      <li>Consider alternative dispute resolution options, such as mediation or arbitration, as they can be quicker and less costly than court proceedings.</li>
                    </ul>
                  </li>
                  <li>Sometimes, no action is best: If your copyright claim is weak, pursuing legal action could invalidate your rights or expose you to counterclaims. A court case requires significant time and resources, so monitor the situation first to determine if legal action is necessary.</li>
                </ul>
                </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel3')}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="span" variant="subtitle2">
              When and what legal steps should I take?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
               <p>Copyright cases cannot be filed with the Intellectual Property Office. You should go to the courts. There are three different cases:</p>
    
                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  <li>For claims under £10,000:
                    <ul>
                      <li>File with the Intellectual Property Enterprise Court (Small Claims Track).</li>
                      <li>Applicable to minor infringements (e.g., unauthorized use of artwork by individuals).</li>
                      <li>Legal representation is not required.</li>
                    </ul>
                  </li>
                  <li>For claims between £10,000 and £500,000:
                    <ul>
                      <li>File with the Intellectual Property Enterprise Court (Main Court).</li>
                      <li>Suitable for larger or more serious copyright cases.</li>
                      <li>Cost limitation:
                        <ul>
                          <li>Legal cost recovery capped at £60,000.</li>
                          <li>Damages capped at £500,000.</li>
                        </ul>
                      </li>
                      <li>Legal representation is recommended.</li>
                    </ul>
                  </li>
                  <li>For claims over £500,000 or complex cases:
                    <ul>
                      <li>File with the High Court (Chancery Division).</li>
                      <li>Suitable for high-value or complex disputes (e.g., large companies using your work).</li>
                      <li>No limits on costs or damages.</li>
                      <li>Legal representation is highly recommended.</li>
                    </ul>
                  </li>
                </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
       
      </Box>
    </Container>
  );
}
