from unittest import main, TestCase
from mock import MagicMock


class TestSSHHandler(TestCase):
    """Unit testing for SSH handler class."""

    ssh = {}

    def setUp(self):
        """Initialize static class testing variables."""
        self.ssh = {'1--ABCDUUID1': 'NetmikoObject-1'}
        self.mock = MagicMock()
        self.session = {'UUID': 'ABCUUID1'}

    def tearDown(self):
        """Run on completion of tests."""
        self.ssh = None
        self.session['UUID'] = None

    def test_get_ssh_key_for_host(self):
        """Validate returning SSH key for looking up existing SSH sessions for a specific host.

        Also validate storing SSH Dict key as host.id followed by '-' followed by username and return.
        """
        pass

    def test_check_host_active_ssh_session(self):
        """Validate checking if existing SSH session for host is currently active."""
        pass

    def test_check_host_existing_ssh_session(self):
        """Validate checking if host currenty has an existing SSH session saved."""
        pass

    def test_retrieve_ssh_session(self):
        """Test connecting to 'host' over SSH.  Store session for use later.

        Return active SSH session for provided host if it exists.
        Otherwise gets a session, stores it, and returns it.
        """
        pass

    def test_disconnect_specific_ssh_session(self):
        """Validate disconnecting any SSH sessions for a specific host from all users."""
        pass

    def test_disconnect_all_ssh_sessions(self):
        """Validate disconnecting all remaining active SSH sessions tied to a user."""
        pass

    def test_count_all_ssh_sessions(self):
        """Validate returning number of active SSH sessions tied to user."""
        pass

    # @mock.patch('app.datahandler.get_host_by_id')
    def test_get_names_of_ssh_session_devices(self):
        """Validate getting names of devices with SSH connection stored by ID."""
        pass
        '''
        mock_gethostid_func_patcher = patch('app.datahandler.get_host_by_id')

        # Start patching 'app.datahandler.get_host_by_id'.
        mock_gethostid_func = mock_gethostid_func_patcher.start()

        # Configure the mock to return a name of a test device.
        mock_gethostid_func.return_value = Mock(["Test-Device-1"])

        # Call the function to test.
        hostList = self.ssh.get_names_of_ssh_session_devices()

        # Stop patching.
        mock_gethostid_func_patcher.stop()

        # Assert that the returned value completed successfully.
        self.assertEqual(hostList, "Test-Device-1")
        '''


if __name__ == "__main__":
    main()
