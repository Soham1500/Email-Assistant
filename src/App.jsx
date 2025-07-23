// src/App.jsx
import { useState } from 'react';
import {
  Box, Button, CircularProgress, Container, CssBaseline,
  FormControl, InputLabel, MenuItem, Select,
  TextField, Typography, Grid, Paper, AppBar, Toolbar, IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  useUser, SignedIn, SignedOut,
  SignInButton, SignOutButton, useAuth
} from '@clerk/clerk-react';
import axios from 'axios';

function App() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
    },
  });

  const { getToken } = useAuth();
  const { user } = useUser();

  // ✅ Use env variable + append endpoint
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/email/generate`;

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const token = await getToken();

      const response = await axios.post(BACKEND_URL, {
        topic,
        emailContent,
        tone
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart Email Generator
          </Typography>

          <SignedIn>
            <Typography sx={{ mr: 2 }}>{user?.primaryEmailAddress?.emailAddress}</Typography>
            <SignOutButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>

          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <SignedIn>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>Input Details</Typography>

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Tone</InputLabel>
                    <Select
                      value={tone}
                      label="Tone"
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="professional">Professional</MenuItem>
                      <MenuItem value="casual">Casual</MenuItem>
                      <MenuItem value="friendly">Friendly</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    label="Original Email Content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!emailContent || loading}
                    fullWidth
                  >
                    {loading ? <CircularProgress size={24} /> : 'Generate Email'}
                  </Button>

                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>Preview</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={12}
                    variant="outlined"
                    value={generatedReply}
                    placeholder="Generated reply will appear here..."
                    InputProps={{ readOnly: true }}
                    sx={{ mb: 2 }}
                  />

                  {generatedReply && (
                    <Button
                      variant="outlined"
                      onClick={() => navigator.clipboard.writeText(generatedReply)}
                      fullWidth
                    >
                      Copy to Clipboard
                    </Button>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SignedIn>

      <SignedOut>
        <Box textAlign="center" sx={{ mt: 6 }}>
          <Typography variant="h6">Please sign in to use the email generator.</Typography>
        </Box>
      </SignedOut>
    </ThemeProvider>
  );
}

export default App;
